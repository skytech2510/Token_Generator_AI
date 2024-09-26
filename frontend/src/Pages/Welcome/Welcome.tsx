import { WelcomeScene } from "Components/StoryBoardScene";
import { useEffect, useRef, useState } from "react";
import useStoryStore from "Store/storyStore";
import { GetTokensByPid, GetTokensByPidOutput } from "Candid/ts/backend.did";
import useUserStore, { Token } from "Store/userStore";
import useAuthStore from "Store/authStore";
import backendServiceInstance from "Services/backendServices";
import bitfinityServiceInstance from "Services/bitfinityServices";
import plugServiceInstance from "Services/plugServices";
import useAppStore from "Store/appStore";
import useRouteStore from "Store/routeStore";
import { whitelist } from "Utils/constants";
import styles from "./welcome.module.scss";
import ConnectWalletDialog from "Pages/WelcomeInfo/ConnectWalletDialog";

const Welcome = () => {
  const goTo = useRouteStore((state) => state.goTo);
  const setStage = useStoryStore((state) => state.setStage);
  const setPrincipalId = useAuthStore((state) => state.setPrincipalId);
  const setIsLoading = useAppStore((s) => s.setIsLoading);

  const idleTimeoutRef = useRef<number>();

  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const setStory = useStoryStore((state) => state.setStage);
  const walletPrincipalId = useAuthStore((state) => state.principalId);

  const noWalletIdleTimeOutRef = useRef<number>();

  // const handlePress = () => {
  //   clearTimeout(idleTimeoutRef.current);
  //   goTo("welcome-info");
  // };

  const handleConnectWalletPress = () => {
    setShowWalletDialog(true);
    setStory("connect_wallet");
  };

  useEffect(() => {
    noWalletIdleTimeOutRef.current = setTimeout(() => {
      if (walletPrincipalId === "") {
        setStory("no_wallet_connected");
      }
    }, 30000);

    return () => {
      clearTimeout(noWalletIdleTimeOutRef.current);
    };
  }, [walletPrincipalId, setStory]);

  const fetchUserTokens = async () => {
    const tokens: GetTokensByPidOutput | undefined =
      await backendServiceInstance.getUserTokens();
    console.log("fetching - tokens", tokens);

    if (tokens !== undefined) {
      if (
        typeof (tokens as { err: Array<string> }).err !== "undefined" &&
        (tokens as { err: Array<string> }).err.length > 0
      ) {
        throw new Error("get tokens response error");
      }

      if (typeof (tokens as { ok: Array<GetTokensByPid> }).ok !== "undefined") {
        const setTokens = useUserStore.getState().setTokens;
        const userTokens: Token[] = (
          tokens as { ok: Array<GetTokensByPid> }
        ).ok.map((token) => ({
          name: token.name,
          symbol: token.symbol,
          coreTraits: token.core_traits.split(","),
          supply: Number(token.initial_supply),
          evaporation: Number(token.bits_evaporated),
          transaction: Number(token.initial_fee),
          image: token.logo_url,
          mintedAt: token.token_created_at.toString(),
          canisterId: token.canister_id,
        }));
        console.log("setting userTokens", userTokens);
        setTokens(userTokens);
      } else {
        throw "Unable to fetch user tokens";
      }
    }
  };

  useEffect(() => {
    console.log("autoLogin - wallet useeffect");
    const autoLogin = async () => {
      var wallet = localStorage.getItem("_loginType");
      console.log("autoLogin - wallet", wallet);
      if (wallet) {
        try {
          switch (wallet) {
            case "plug":
              const connected = await plugServiceInstance.isConnected();
              if (connected) {
                if (!window.ic.plug.agent) {
                  await window.ic.plug.createAgent({ whitelist });
                }

                const principal = await window.ic.plug.agent.getPrincipal();
                if (principal) {
                  setIsLoading(true);
                  setPrincipalId(principal.toString());
                  await plugServiceInstance.initIcpLedgerActor();
                  await backendServiceInstance.initThroughPlug();
                  await fetchUserTokens();
                  setIsLoading(false);
                  goTo("dashboard");
                }
              }
              break;
            case "bitfinity":
              const isConnected = await bitfinityServiceInstance.isConnected();
              if (isConnected) {
                const principal = await window.ic.infinityWallet.getPrincipal();
                if (principal) {
                  setIsLoading(true);
                  setPrincipalId(principal.toString());
                  await bitfinityServiceInstance.initIcpLedgerActor();
                  await backendServiceInstance.initThroughBitfinity();
                  await fetchUserTokens();
                  setIsLoading(false);
                  goTo("dashboard");
                }
              }
              break;
            default:
              break;
          }
        } catch (e) {
          setIsLoading(false);
          console.log(e);
          throw e;
        }
      } else {
      }
    };
    autoLogin();
  }, []);

  useEffect(() => {
    idleTimeoutRef.current = setTimeout(() => {
      setStage("welcome_idle");
    }, 30000);

    return () => {
      clearTimeout(idleTimeoutRef.current);
    };
  }, [setStage]);

  return (
    <>
      {showWalletDialog ? (
        <ConnectWalletDialog
          onClose={() => {
            setShowWalletDialog(false);
            setStory("welcome_info");
          }}
        />
      ) : null}
      <div className={styles.container}>
        <div className={styles.welcomeContainer}>
          <div className={styles.scene}>
            <WelcomeScene />
          </div>
          <div className={styles.description}>
            <h1 className="ty-h6">BitWizard Toko Blaster</h1>
            <p className="ty-p1">
              Yo, What up! Jesse here to guide you through the BitWizard Toko
              Blaster. Together, we'll give birth to some epic ideas and bring
              them to life. Follow my steps, and we'll have your very own token
              ready to hit the streets. Let's get started and break some bits,
              yo!
            </p>
          </div>
        </div>
        <hr />
        <div className={styles.welcomeFooter}>
          <button className="button" onClick={handleConnectWalletPress}>
            Yo! Let's Roll
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;

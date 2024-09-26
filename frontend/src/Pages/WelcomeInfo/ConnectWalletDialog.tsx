import bitfinity from "Assets/Images/Icons/bit-finity.png";
import plug from "Assets/Images/Icons/plug.svg";
import { GetTokensByPid, GetTokensByPidOutput } from "Candid/ts/backend.did";
import { WebMoney } from "Components/Icons";
import backendServiceInstance from "Services/backendServices";
import bitfinityServiceInstance from "Services/bitfinityServices";
import plugServiceInstance from "Services/plugServices";
import useAppStore from "Store/appStore";
import useAuthStore from "Store/authStore";
import useRouteStore from "Store/routeStore";
import useUserStore, { Token } from "Store/userStore";
import styles from "./connectWallet.module.scss";

interface ConnectWalletDialogProps {
  onClose: () => void;
}

const ConnectWalletDialog = (props: ConnectWalletDialogProps) => {
  const { onClose } = props;
  const goTo = useRouteStore((state) => state.goTo);
  const setWallet = useAuthStore((state) => state.setWallet);
  const setPrincipalId = useAuthStore((state) => state.setPrincipalId);
  const setIsLoading = useAppStore((s) => s.setIsLoading);

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

  const handlePlugPress = async () => {
    try {
      setWallet("plug");
      // const isConnected = await plugServiceInstance.isConnected();
      // console.log("isConnected", isConnected);
      const login = await plugServiceInstance.login();
      console.log(
        "login - principalId",
        login,
        plugServiceInstance.principalId
      );

      if (login) {
        setIsLoading(true);
        await backendServiceInstance.initThroughPlug();
        if (plugServiceInstance.principalId) {
          console.log(
            "handlePlugPress - plugServiceInstance.principalId",
            plugServiceInstance.principalId
          );
          setPrincipalId(plugServiceInstance.principalId.toString());
          await fetchUserTokens();

          setIsLoading(false);
          localStorage.setItem("_loginType", "plug");
          goTo("dashboard");
        }
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      throw e;
    }

    // onClose();
  };
  const handleBitfinityPress = async () => {
    try {
      setWallet("bitfinity");

      const login = await bitfinityServiceInstance.login();
      console.log(
        "login - bitfinity - principalId",
        login,
        bitfinityServiceInstance.principalId
      );

      if (login) {
        setIsLoading(true);
        await backendServiceInstance.initThroughBitfinity();
        if (bitfinityServiceInstance.principalId) {
          console.log(
            "handleBitfinityPress - bitfinityServiceInstance.principalId",
            bitfinityServiceInstance.principalId
          );
          setPrincipalId(bitfinityServiceInstance.principalId.toString());
          await fetchUserTokens();

          setIsLoading(false);
          localStorage.setItem("_loginType", "bitfinity");
          goTo("dashboard");
        }
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      throw e;
    }
    // onClose();
  };

  return (
    <div className={styles.backdrop}>
      <div className={`window ${styles.container}`}>
        <div className="title-bar">
          <div className="title-bar-text">Connect Wallet</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>

        <div className={styles.header}>
          <WebMoney />
          <h6>Connect Wallet yo!</h6>
        </div>
        <div className={styles.body}>
          <button onClick={handlePlugPress}>
            Plug <img src={plug} alt={"Plug logo"} />
          </button>
          <button onClick={handleBitfinityPress}>
            Bitfinity <img src={bitfinity} alt={"Bitfinity logo"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletDialog;

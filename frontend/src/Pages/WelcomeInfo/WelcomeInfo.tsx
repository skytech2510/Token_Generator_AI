import { useEffect, useRef, useState } from "react";

import ConnectWalletDialog from "./ConnectWalletDialog";

import styles from "./welcomeInfo.module.scss";
import { WelcomeInfoScene } from "Components/StoryBoardScene";
import useStoryStore from "Store/storyStore";
import useAuthStore from "Store/authStore";

const WelcomeInfo = () => {
  // const goBack = useRouteStore((state) => state.goBack);
  // const goTo = useRouteStore((state) => state.goTo);
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const setStory = useStoryStore((state) => state.setStage);
  const walletPrincipalId = useAuthStore((state) => state.principalId);

  const noWalletIdleTimeOutRef = useRef<number>();

  // const goToDashboard = () => {
  //   if (walletPrincipalId === "") {
  //     setStory("no_wallet_connected");
  //   } else {
  //     goTo("dashboard");
  //   }
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
            <WelcomeInfoScene />
          </div>
          <div className={styles.description}>
            <p className="ty-h6">
              Hey, listen up! Before we dive into the nitty-gritty, here's what
              you need to know about our BitWizard launcher:
            </p>
            <p className="ty-h6">Token Standard: ICRC-3</p>
            <div>
              <h6>Black Holed Canister</h6>
              <p>
                Next, the canister's gonna be black holed. No controller wallet
                here, just pure, uncut security. Once it's out there, it's out
                there for good.
              </p>
            </div>
            <div>
              <h6>Burning Bits</h6>
              <p>
                We've set aside 15% just for burning bits. Sometimes you gotta
                burn things to make'em shine brighter, right?
              </p>
            </div>
            <div>
              <h6>Stable Price</h6>
              <p>
                The price is stable, pegged to dollars but paid in ICP. We're
                talking $19.98, give or take in ICP, yo.
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.welcomeFooter}>
          {/* <button className="button" onClick={goBack}>
            Miss somethin'? Go Back
          </button> */}
          <button className="button" onClick={handleConnectWalletPress}>
            Connect your Wallet yo!
          </button>
          {/* <button className="button" onClick={goToDashboard}>
            Let's Do This, Fam!
          </button> */}
        </div>
      </div>
    </>
  );
};

export default WelcomeInfo;

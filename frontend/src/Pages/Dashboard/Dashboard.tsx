import Tooltip from "Components/Tooltip/Tooltip";
import styles from "./dashboard.module.scss";
import UserTokens from "./UserTokens";

import paintImg from "Assets/Images/Icons/paint-file.png";
import useRouteStore from "Store/routeStore";

const Dashboard = () => {
  const goTo = useRouteStore((s) => s.goTo);

  const handleCreateNewTokenPress = () => {
    goTo("token-form");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        <h4>Yo, what up, biatch! 👋🏻</h4>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonsFirstRowContainer}>
            <button className={styles.button}>
              <p className="ty-h6">
                $Bits Evaporated using
                <br />
                BitWizard, Hell Yeah!
              </p>

              <div className="ty-h3">
                <Tooltip
                  label="We've set aside 15% just for burning bits. Sometimes you gotta burn things to make them shine brighter, right?"
                  className={styles.tooltip}
                  bubbleClassName={styles.tooltipBubble}
                />
                {Intl.NumberFormat("en-US").format(1000)}{" "}
                <span className="ty-p3">$Bits</span>
              </div>
            </button>
            <button className={styles.button}>
              <p className="ty-h6">
                $EXE burnt for
                <br />
                the Windoge ICP empire
              </p>
              <div className="ty-h3">
                <Tooltip
                  label="We will be burning 5% for $EXE"
                  className={styles.tooltip}
                  bubbleClassName={styles.tooltipBubble}
                />
                {Intl.NumberFormat("en-US").format(1000)}{" "}
                <span className="ty-p3">$Bits</span>
              </div>
            </button>
          </div>
          <button className={styles.button} onClick={handleCreateNewTokenPress}>
            <div className={styles.buttonLabelContainer}>
              <div className={styles.leftImage}>
                <img src={paintImg} height={40} width={40} alt="painting kit" />
              </div>
              <div className={styles.nameContainer}>
                <p className="ty-b1">Cook New Token</p>
                <p className="ty-p3">Yo, Bro! Let's Cook it Up</p>
              </div>
            </div>
            <div className="ty-h4">+</div>
          </button>
        </div>
      </div>
      <UserTokens />
    </div>
  );
};

export default Dashboard;

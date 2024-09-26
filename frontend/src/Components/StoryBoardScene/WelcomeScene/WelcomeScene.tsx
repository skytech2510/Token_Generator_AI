import { Jesse } from "Components/Character";
import styles from "./welcomeScene.module.scss";

const WelcomeScene = () => {
  return (
    <div className={styles.background}>
      <div className={styles.jesseContainer}>
        <Jesse />
      </div>
    </div>
  );
};

export default WelcomeScene;

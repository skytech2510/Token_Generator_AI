import { Jesse } from "Components/Character";
import styles from "./welcomeInfoScene.module.scss";

const WelcomeInfoScene = () => {
  return (
    <div className={styles.background}>
      <div className={styles.jesseContainer}>
        <Jesse />
      </div>
    </div>
  );
};

export default WelcomeInfoScene;

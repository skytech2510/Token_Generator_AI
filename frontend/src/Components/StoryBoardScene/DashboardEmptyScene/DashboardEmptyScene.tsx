import { Jesse, White } from "Components/Character";
import style from "./dashboardEmptyScene.module.scss";

const DashboardEmptyScene = () => {
  return (
    <div className={style.background}>
      <div className={style.jesseContainer}>
        <Jesse />
      </div>
      <div className={style.whiteContainer}>
        <White />
      </div>
      <div className={style.road} />
    </div>
  );
};

export default DashboardEmptyScene;

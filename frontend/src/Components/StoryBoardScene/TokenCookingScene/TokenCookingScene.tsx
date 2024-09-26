import { Jesse, White } from "Components/Character";
import style from "./tokenCookingScene.module.scss";
import cloudBig from "Assets/Images/BG/cloud_big.svg";
import cloudSmall from "Assets/Images/BG/cloud_sm.svg";
import flask from "Assets/Images/BG/flask.svg";

const TokenCookingScene = () => {
  return (
    <div className={style.container}>
      <div className={style.whiteContainer}>
        <White inverted={true} />
      </div>
      <div className={style.jesseContainer}>
        <Jesse inverted={true} />
      </div>
      <img src={cloudBig} aria-hidden className={style.bigCloud} />
      <img src={cloudSmall} aria-hidden className={style.smallCloud} />
      <img src={flask} aria-hidden className={style.flask} />
    </div>
  );
};

export default TokenCookingScene;

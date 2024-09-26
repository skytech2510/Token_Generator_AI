import { Jesse } from "Components/Character";
import style from "./tokenFormStep1Scene.module.scss";

const TokenFormStep1Scene = () => {
  return (
    <div className={style.background}>
      <div className={style.jesseContainer}>
        <Jesse />
      </div>
      <div className={style.road} />
    </div>
  );
};

export default TokenFormStep1Scene;

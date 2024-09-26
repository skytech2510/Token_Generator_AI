import { Jesse } from "Components/Character";
import style from "./tokenFormStep2Scene.module.scss";

const TokenFormStep2Scene = () => {
  return (
    <div className={style.background}>
      <div className={style.jesseContainer}>
        <Jesse />
      </div>
      <div className={style.road} />
    </div>
  );
};

export default TokenFormStep2Scene;

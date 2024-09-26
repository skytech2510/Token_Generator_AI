import { Jesse } from "Components/Character";
import style from "./tokenFormStep3Scene.module.scss";

const TokenFormStep3Scene = () => {
  return (
    <div className={style.background}>
      <div className={style.jesseContainer}>
        <Jesse />
      </div>
      <div className={style.road} />
    </div>
  );
};

export default TokenFormStep3Scene;

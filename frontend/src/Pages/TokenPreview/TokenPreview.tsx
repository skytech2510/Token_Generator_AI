import useRouteStore from "Store/routeStore";
import style from "./tokenPreview.module.scss";
import QRCode from "react-qr-code";

import { Discord, Twitter, Facebook, Instagram, XLogo } from "Components/Icons";

const TokenPreview = () => {
  const routeParams = useRouteStore((state) => state.params);
  const goTo = useRouteStore((state) => state.goTo);
  const token = routeParams?.type === "token" ? routeParams.value : undefined;

  if (!token) {
    return null;
  }

  const { symbol, name, evaporation, supply, mintedAt, canisterId, image } =
    token;

  const goToDashboard = () => {
    goTo("dashboard");
  };

  return (
    <div className={style.container}>
      <div className={style.body}>
        <div className={style.tokenCard}>
          <div className={style.tokenCardMain}>
            <img src={image} height={150} width={150} />
            <div className={style.mainDetails}>
              <div className={style.pill}>
                <p>Name:</p>
                <p>{name}</p>
              </div>
              <div className={style.pill}>
                <p>Symbol:</p>
                <p>{symbol}</p>
              </div>
            </div>
            <QRCode
              value={canisterId}
              size={150}
              fgColor="white"
              bgColor="transparent"
            />
          </div>
          <div className={style.tokenCardDetails}>
            <div className={style.infoColumn}>
              <div className={style.tokenInfo}>
                <p>Canister ID</p>
                <abbr className="truncate" title={canisterId}>
                  {canisterId}
                </abbr>
              </div>
              <div className={style.tokenInfo}>
                <p>Fee:</p>
                <p>{evaporation}</p>
              </div>
            </div>
            <div className={style.verticalHr} />
            <div className={style.infoColumn}>
              <div className={style.tokenInfo}>
                <p>Supply</p>
                <p>{Intl.NumberFormat("en-US").format(supply)}</p>
              </div>
              <div className={style.tokenInfo}>
                <p>Date</p>
                <p>{new Date(mintedAt).toDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.social}>
          <a href="#" target="_blank">
            <Twitter />
            @Breaking_Bits
          </a>
          <a href="https://breakingbits.org/" target="_blank">
            https://breakingbits.org/
          </a>
        </div>
      </div>
      <hr />
      <div className={style.footer}>
        <div>
          <button>
            <Facebook /> Facebook
          </button>
          <button>
            <XLogo /> Twitter
          </button>
          <button>
            <Discord /> Discord
          </button>
          <button>
            <Instagram /> Instagram
          </button>
        </div>
        <div>
          <button onClick={goToDashboard}>
            Fire yo! Let's hop back to the Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenPreview;

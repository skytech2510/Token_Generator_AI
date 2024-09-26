/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowCircleLeft, ArrowCircleRight } from "Components/Icons";
import { DashboardEmptyScene } from "Components/StoryBoardScene";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useStoryStore from "Store/storyStore";
import useUserStore, { Token } from "Store/userStore";
import dashboardStyles from "./dashboard.module.scss";
import styles from "./userToken.module.scss";
import useRouteStore from "Store/routeStore";

const NoTokensCreated = () => {
  const setStage = useStoryStore((state) => state.setStage);

  useLayoutEffect(() => {
    setStage("no_tokens");
  }, [setStage]);

  return (
    <div className={styles.emptyStateContainer}>
      <DashboardEmptyScene />
    </div>
  );
};

interface TokenButtonProps {
  token: Token;
  onClick: () => void;
}

const TokenButton = (props: TokenButtonProps) => {
  const { token, onClick } = props;
  const { name, symbol, image } = token;

  return (
    <button className={styles.tokenButton} onClick={onClick}>
      <div className={`sunken-panel ${styles.tokenImageContainer}`}>
        <img src={image} alt={`${symbol} - ${name} - logo`} />
      </div>
      <div className={styles.tokenDetailsContainer}>
        <div className="ty-b1">
          <p>{symbol}</p>
          <p>{name}</p>
        </div>
        <button onClick={onClick} className={styles.tokenViewMoreButton}>
          View More
        </button>
      </div>
    </button>
  );
};

const UserTokens = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tokens = useUserStore((state) => state.tokens);
  const openTokenPreview = useRouteStore((s) => s.openTokenPreview);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  useEffect(() => {
    const isScrolling = scrollRef.current
      ? scrollRef.current.clientWidth < scrollRef.current.scrollWidth
      : false;
    setShowScrollButton(isScrolling);
  }, [tokens.length]);

  const onPrevPress = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - 300;
    }
  };
  const onNextPress = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft + 300;
    }
  };

  return (
    <div className={dashboardStyles.sectionContainer}>
      <div className={dashboardStyles.sectionHeader}>
        <h4>Breaking Badass Creations</h4>
        {showScrollButton ? (
          <div className={styles.buttonContainer}>
            <button onClick={onPrevPress} className={styles.iconButton}>
              <ArrowCircleLeft />
            </button>
            <button onClick={onNextPress} className={styles.iconButton}>
              <ArrowCircleRight />
            </button>
          </div>
        ) : null}
      </div>
      {tokens.length === 0 ? (
        <NoTokensCreated />
      ) : (
        <div className={styles.tokenListContainer} ref={scrollRef}>
          {tokens.map((t, i) => (
            <TokenButton
              token={t}
              onClick={() => {
                openTokenPreview(t);
              }}
              key={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTokens;

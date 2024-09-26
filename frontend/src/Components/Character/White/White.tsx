import whiteNeutral from "Assets/Images/Character/white_neutral.svg";
import Bubble from "Components/Bubble";

import styles from "./white.module.scss";
import useStoryStore from "Store/storyStore";

const CharacterMap = {
  neutral: whiteNeutral,
  smile: whiteNeutral,
};

interface WhiteProps {
  height?: number;
  width?: number;
  inverted?: boolean;
}

const White = (props: WhiteProps) => {
  const { height = 188, width = 150 } = props;
  const {
    visible,
    inverted,
    expression,
    styleOverride,
    bubbleContent,
    bubbleStyleOverride,
  } = useStoryStore((state) => state.white ?? {});

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.container}>
      <img
        src={CharacterMap[expression]}
        alt={`Mr. White - ${expression}`}
        height={height}
        width={width}
        style={styleOverride}
        data-inverted={!inverted}
      />
      <div
        className={styles.bubbleContainer}
        style={bubbleStyleOverride}
        data-inverted={inverted}
      >
        <Bubble
          content={bubbleContent?.content ?? ""}
          arrowPosition="bottom"
          inverted={inverted}
        />
      </div>
    </div>
  );
};

export default White;

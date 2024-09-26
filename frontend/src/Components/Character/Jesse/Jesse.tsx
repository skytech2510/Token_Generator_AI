import jesseNeutral from "Assets/Images/Character/jesse_neutral.svg";
import jesseSmile from "Assets/Images/Character/jesse_smile.svg";
import Bubble from "Components/Bubble";

import styles from "./jesse.module.scss";
import useStoryStore from "Store/storyStore";

const CharacterMap = {
  neutral: jesseNeutral,
  smile: jesseSmile,
};

interface JesseProps {
  height?: number;
  width?: number;
  inverted?: boolean;
}

const Jesse = (props: JesseProps) => {
  const { height = 188, width = 140, inverted } = props;
  const {
    visible,
    expression,
    styleOverride,
    bubbleContent,
    bubbleStyleOverride,
  } = useStoryStore((state) => state.jesse ?? {});

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.container}>
      <img
        src={CharacterMap[expression]}
        alt={`Jesse - ${expression}`}
        height={height}
        width={width}
        style={styleOverride}
        data-inverted={inverted}
      />
      <div className={styles.bubbleContainer} style={bubbleStyleOverride}>
        <Bubble
          contentType={bubbleContent?.type}
          content={bubbleContent?.content ?? ""}
          arrowPosition="bottom"
          inverted={inverted}
        />
      </div>
    </div>
  );
};

export default Jesse;

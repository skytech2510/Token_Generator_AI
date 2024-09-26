import styles from "./bubbles.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";

interface BubbleProps {
  content: string;
  contentType?: "img" | "text";
  arrowPosition?: "top" | "bottom" | "right" | "left";
  inverted?: boolean;
  isTooltip?: boolean;
  disableAnimation?: boolean;
}

const Bubble = (props: BubbleProps) => {
  const {
    content,
    contentType = "text",
    arrowPosition,
    inverted = false,
    isTooltip = false,
    disableAnimation = false,
  } = props;
  const [visibleContentIndex, setVisibleContentIndex] = useState(
    disableAnimation ? content.length : 0
  );

  const audioElem = document.getElementById(
    "bg_noise"
  ) as HTMLAudioElement | null;

  const className = cn({
    [styles.bubble]: true,
    [styles.top]: arrowPosition === "top",
    [styles.bottom]: arrowPosition === "bottom",
    [styles.left]: arrowPosition === "left",
    [styles.right]: arrowPosition === "right",
    [styles.inverted]: inverted,
    [styles.tooltip]: isTooltip,
  });

  useEffect(() => {
    let interval: number;
    const playAnimation = () => {
      if (audioElem) {
        audioElem.volume = 0.2;
      }
      setVisibleContentIndex(0);
      if (contentType === "text" && content.length > 0) {
        audioElem?.play();
        interval = window.setInterval(() => {
          setVisibleContentIndex((prevIndex) => {
            if (prevIndex === content.length) {
              clearInterval(interval);
              audioElem?.pause();
            }
            if (prevIndex < content.length) {
              return prevIndex + 1;
            } else {
              return prevIndex;
            }
          });
        }, 50);
      }
    };

    if (!disableAnimation) {
      playAnimation();
    }

    return () => {
      clearInterval(interval);
      audioElem?.pause();
    };
  }, [content, contentType, audioElem, disableAnimation]);

  useEffect(() => {
    const stopPlayer = () => {
      if (audioElem) {
        audioElem.pause();
      }
    };

    window.addEventListener("blur", stopPlayer);

    return () => {
      window.removeEventListener("blur", stopPlayer);
    };
  }, [audioElem]);

  if (content.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {contentType === "text" ? (
        content.slice(0, visibleContentIndex)
      ) : (
        <img src={content} />
      )}
    </div>
  );
};

export default Bubble;

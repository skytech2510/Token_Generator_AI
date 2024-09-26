import { useState } from "react";
import styles from "./Tooltip.module.scss";
import Bubble from "Components/Bubble";
import classNames from "classnames";

interface TooltipProps {
  label: string;
  className?: string;
  bubbleClassName?: string;
}

const Tooltip = (props: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { label, className, bubbleClassName } = props;

  const show = () => {
    setIsVisible(true);
  };
  const hide = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={classNames({
        [styles.container]: true,
        [className as string]: className !== undefined,
      })}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
    >
      {isVisible ? (
        <div
          className={classNames({
            [styles.bubbleContent]: true,
            [bubbleClassName as string]: bubbleClassName !== undefined,
          })}
        >
          <Bubble content={label} isTooltip={true} disableAnimation={true} />
        </div>
      ) : null}
    </div>
  );
};

export default Tooltip;

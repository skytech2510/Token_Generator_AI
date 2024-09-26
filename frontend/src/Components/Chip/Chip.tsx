import React from "react";
import styles from "./chip.module.scss";

interface ChipProps {
  text: string;
  onClose?: () => void;
}

const Chip: React.FC<ChipProps> = ({ text, onClose }) => {
  return (
    <div className={styles.chip}>
      <span className={styles.chipText}>{text}</span>
      {onClose && (
        <button className={styles.chipClose} onClick={onClose}>
          X
        </button>
      )}
    </div>
  );
};

export default Chip;

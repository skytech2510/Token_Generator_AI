import React, { useState } from "react";
import styles from "./Textbox.module.scss";

type Chip = {
  id: number;
  label: string;
};

type TextboxProps = {
  onChipsChange?: (chips: Chip[]) => void;
};

const Textbox: React.FC<TextboxProps> = ({ onChipsChange }) => {
  const [chips, setChips] = useState<Chip[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newChip: Chip = { id: Date.now(), label: inputValue.trim() };
      const updatedChips = [...chips, newChip];
      setChips(updatedChips);
      setInputValue("");
      onChipsChange?.(updatedChips);
    }
  };

  const handleDeleteChip = (id: number) => {
    const updatedChips = chips.filter((chip) => chip.id !== id);
    setChips(updatedChips);
    onChipsChange?.(updatedChips);
  };

  return (
    <div className={styles.textboxContainer}>
      {chips.map((chip) => (
        <div key={chip.id} className={styles.chipContainer}>
          {chip.label}
          <span
            className={styles.deleteButton}
            onClick={() => handleDeleteChip(chip.id)}
          >
            x
          </span>
        </div>
      ))}
      <input
        className={styles.styledInput}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type and press Enter"
      />
    </div>
  );
};

export default Textbox;

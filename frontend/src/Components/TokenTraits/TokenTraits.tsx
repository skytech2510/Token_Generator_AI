import { CancelOutlined } from "@mui/icons-material";
import { Autocomplete, Chip, TextField } from "@mui/material";
import React from "react";
import "./TokenTraits.scss";

interface TokenTraitsProps {
  coreTraits: string[];
  handleInputChange: (value: string[]) => void;
}

const TokenTraits: React.FC<TokenTraitsProps> = ({
  coreTraits,
  handleInputChange,
}: TokenTraitsProps) => {
  return (
    <Autocomplete
      style={{ width: "100%" }}
      clearIcon={false}
      options={[]}
      value={coreTraits}
      onChange={(_event, newval) => {
        handleInputChange(newval);
      }}
      limitTags={4}
      freeSolo
      multiple
      disableClearable={true}
      renderTags={(value, props) =>
        value.map((option, index) => {
          const { key, ...tagProps } = props({ index });
          return (
            <Chip
              key={key}
              label={option}
              {...tagProps}
              variant="outlined"
              deleteIcon={<CancelOutlined />}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          onKeyDown={(e: any) => {
            if (e.code === "enter" && e.target.value) {
              handleInputChange(coreTraits.concat(e.target.value));
            }
          }}
        />
      )}
    />
  );
};

export default TokenTraits;

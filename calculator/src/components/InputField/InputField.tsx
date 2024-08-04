import React from "react";
import { TextField } from "@mui/material";
import "./InputField.css";
interface InputFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
}) => {

  //For adding the number input filed  validation on keydown event
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedChars = "0123456789";
    // Prevent non-digit characters and backspace key from being entered.
    if (!allowedChars.includes(event.key) && event.key !== "Backspace") {
      event.preventDefault();
    }
  };

  return (
    <TextField
      label={label}
      name={name}
      type="number"
      value={value === 0 ? "" : value}
      onChange={onChange}
      variant="outlined"
      className="input-field"
      inputProps={{ min: 1,max:99 }}
      onKeyDown={handleOnKeyDown}
    />
  );
};

export default InputField;

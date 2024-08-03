import React from 'react';
import { TextField } from '@mui/material';
import './InputField.css'
interface InputFieldProps  {
  label: string;
  name: string;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange }) => {
  return (
    <TextField
      label={label}
      name={name}
      type="number"
      value={value}
      onChange={onChange}
      variant="outlined"
      className="input-field"
      inputProps={{ min: 1 }}
    />
  );
};

export default InputField;

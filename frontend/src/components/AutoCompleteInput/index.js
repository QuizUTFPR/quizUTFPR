import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const InputAutoComplete = ({
  id,
  stateValue,
  onChange,
  suggestions,
  variant,
  label,
  placeholder,
}) => (
  <Autocomplete
    options={suggestions.map((item) => item)}
    freeSolo
    id={id}
    value={stateValue}
    onChange={(e, value) => onChange(id)(value)}
    renderInput={(params) => (
      <TextField
        required
        {...params}
        id={id}
        variant={variant}
        label={label}
        onChange={onChange}
        placeholder={placeholder}
      />
    )}
  />
);

export default InputAutoComplete;

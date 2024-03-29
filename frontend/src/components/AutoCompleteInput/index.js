import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

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
    onChange={(_e, value) => onChange(id, value)}
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

InputAutoComplete.defaultProps = {
  onChange: () => {},
  variant: 'contained',
  color: 'primary',
  label: 'Label',
  placeholder: 'Placeholder',
  suggestions: [''],
  stateValue: '',
};

InputAutoComplete.propTypes = {
  id: PropTypes.string.isRequired,
  stateValue: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

export default InputAutoComplete;

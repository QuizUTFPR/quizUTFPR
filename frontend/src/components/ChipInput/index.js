import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ChipStyled } from './style';

const ChipsArray = ({
  value,
  variant,
  onChange,
  id,
  suggestions,
  label,
  placeholder,
  required,
  ...props
}) => {
  const [valueInput, setValueInput] = useState('');
  return (
    <Autocomplete
      {...props}
      multiple
      id={id}
      options={suggestions.map((item) => item)}
      value={value}
      variant={variant}
      freeSolo
      onChange={(e, newTags) => {
        if (e.code !== 'Backspace') {
          onChange(e, newTags);
          setValueInput('');
        }
      }}
      renderTags={(valueTags, getTagProps) =>
        valueTags.map((option, index) => (
          <ChipStyled
            variant={variant}
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            required={required}
            variant={variant}
            label={label}
            placeholder={placeholder}
            inputProps={{
              ...params.inputProps,
              value: valueInput,
              onBlur: (e) => {
                if (valueInput.length > 0) {
                  onChange(valueInput, [...value, valueInput]);
                }
                setValueInput('');
                params.inputProps.onBlur(e);
              },
            }}
            onChange={(e) => {
              setValueInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code === 'Backspace') {
                if (e.target.value.length === 0) {
                  const newTags = value.slice(0, -1);
                  onChange(e, newTags);
                }
              }
            }}
          />
        );
      }}
    />
  );
};

ChipsArray.defaultProps = {
  onChange: () => {},
  variant: 'outlined',
  id: 'tags-filled',
  label: 'Tags',
  placeholder: 'Digite aqui as tags desejadas',
  required: false,
};

ChipsArray.propTypes = {
  id: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default ChipsArray;

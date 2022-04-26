import React from 'react';
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
  ...props
}) => {
  return (
    <Autocomplete
      {...props}
      multiple
      id={id}
      options={suggestions.map((item) => item)}
      value={value}
      variant={variant}
      freeSolo
      onChange={onChange}
      renderTags={(valueTags, getTagProps) =>
        valueTags.map((option, index) => (
          <ChipStyled
            variant={variant}
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};

ChipsArray.defaultProps = {
  onChange: () => {},
  variant: 'outlined',
  id: 'tags-filled',
  label: 'Tags',
  placeholder: 'Digite aqui as tags desejadas',
};

ChipsArray.propTypes = {
  id: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default ChipsArray;

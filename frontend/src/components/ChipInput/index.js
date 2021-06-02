import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ChipStyled } from './style';

export default function ChipsArray({
  value,
  variant,
  onChange,
  suggestions,
  ...props
}) {
  return (
    <Autocomplete
      {...props}
      multiple
      id="tags-filled"
      options={suggestions.map((item) => item)}
      value={value}
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
          variant="outlined"
          label="Tag's"
          placeholder="Digite aqui as tag's desejadas"
        />
      )}
    />
  );
}

ChipsArray.defaultProps = {
  onChange: () => {},
  variant: 'outlined',
};

ChipsArray.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.string,
};

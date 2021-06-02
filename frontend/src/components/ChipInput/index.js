import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ChipStyled } from './style';

export default function ChipsArray({ value, onChange, suggestions, ...props }) {
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
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label="Tag's"
          placeholder="Digite aqui as tag's desejadas"
        />
      )}
    />
  );
}

ChipsArray.defaultProps = {
  onChange: () => {},
};

ChipsArray.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

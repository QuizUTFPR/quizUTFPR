import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ChipStyled } from './style';

export default function ChipsArray({ value, onChange, suggestions }) {
  return (
    <Autocomplete
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

import React from "react";
import { Chip, TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function ChipsArray({value, onChange, suggestions}) {
  return (
    <Autocomplete
        multiple
        id="tags-filled"
        options={suggestions.map((item) => item)}
        value={value}
        freeSolo
        onChange={onChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))}
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="Tag's" placeholder="Digite aqui as tag's desejadas" />
        )}
      />
  );
}

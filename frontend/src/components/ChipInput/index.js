import React from "react";
import { Chip, TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 }
]

export default function ChipsArray({value, onChange}) {
  console.log(onChange)
  return (
    <Autocomplete
        multiple
        id="tags-filled"
        options={top100Films.map((option) => option.title)}
        value={value}
        onChange={(_,v) => onChange(v)}
        freeSolo
        renderTags={(value, getTagProps) =>{
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }}
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="freeSolo" placeholder="Favorites" />
        )}
      />
  );
}

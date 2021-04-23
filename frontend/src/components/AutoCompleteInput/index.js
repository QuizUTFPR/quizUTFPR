import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';


const InputAutoComplete = ({ stateValue, onChange, suggestions, variant, label, placeholder}) => {
  return (
    <Autocomplete
        id="free-solo-input"
        options={suggestions.map((item) => item)}
        value={stateValue}
        freeSolo
        onChange={(e) => console.log(e)}
        renderInput={(params) => (
          <TextField {...params} />
        )}
      />
  );
}

export default InputAutoComplete;
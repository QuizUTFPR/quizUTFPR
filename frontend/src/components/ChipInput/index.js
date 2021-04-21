import React from "react";
import { Chip, TextField } from "@material-ui/core";

export default function ChipsArray({ ...props }) {
  React.useEffect(() => {
    console.log("att");
  }, [props.tagList]);

  const handleDelete = chipToDelete => () =>
    props.setTagList(chips => chips.filter(chip => chip !== chipToDelete));

  const handleAdd = ({ key, target }) => {
    if (key === "Enter") {
      const value = target.value.trim();

      if (props.tagList.indexOf(value) === -1) {
        props.setTagList(prevChips => [...prevChips, value]);
      }
    }
  };

  return (
    <TextField
      {...props}
      label="Tag's"
      InputProps={{
        onKeyDown: handleAdd,
        startAdornment: props.tagList.map(data => (
          <Chip key={data} label={data} onDelete={handleDelete(data)} />
        ))
      }}
    />
  );
}

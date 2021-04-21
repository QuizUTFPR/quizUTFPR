import React from 'react';
import {Chip, TextField} from '@material-ui/core';



export default function ChipsArray() {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  React.useEffect(() => {
    console.log("att")
  }, [chipData])

  const handleDelete = chipToDelete => () => 
  setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  
  const handleAdd = ({key, target}) => {
    console.log(key, target.value)
    if(key === 'Enter'){
      console.log("iniciou")
      setChipData(
        (prevChips) => [
          ...prevChips,
          {
            key: chipData.length,
            label: target.value
          }
        ]
      )
      console.log("terminou")
    }
  }; 

  return (
    <TextField
      label="Tag's"
      InputProps={{
        onKeyDown: handleAdd,
        startAdornment: chipData.map(data => (
            <Chip
              key={data.key}
              label={data.label}
              onDelete={handleDelete(data)}
            />
          ))
      }}
    />
  );
}
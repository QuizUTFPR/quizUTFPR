import React, { useState } from 'react'

import ChipInput from "@components/ChipInput";
  

const TagInput = ({children, formikID, handleFormikChange, handlePropsChange, value,...props}) => {
    const [timer, setTimer] = useState(null);

    const handleUpdateContext = ({handleUpdate, ...params}) => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      setTimer(setTimeout(() => handleUpdate({...params}), 500));
    }

    const newValue = value.map((item) => item.name);
    
    return (
        <ChipInput
            id={formikID}
            onChange={(_, tags) => {
                const newTags = tags.map((item) => ({name: item}))
                handleFormikChange("question.tags", newTags);
                handleUpdateContext({value: tags, ...handlePropsChange} );
            }}
            value={newValue}
            {...props}
        />
    )


}

export default TagInput;
import React, { useState } from 'react'

import ChipInput from "@components/ChipInput";
  

const TagInput = ({children, formikID, handleFormikChange, handlePropsChange, ...props}) => {
    const [timer, setTimer] = useState(null);

    const handleUpdateContext = ({handleUpdate, ...params}) => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      setTimer(setTimeout(() => handleUpdate({...params}), 500));
    }

    return (
        <ChipInput
            id={formikID}
            onChange={(_, tags) => {
                handleFormikChange("question.tags", tags);
                handleUpdateContext({value: tags, ...handlePropsChange} );
            }}
            {...props}
        />
    )


}

export default TagInput;
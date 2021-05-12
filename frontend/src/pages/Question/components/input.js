import React, { useState, memo } from 'react'


const QuestionInput = ({formikID, contextID, valueOfIndex,handleFormikChange, updateAnswer, index, value, ...props}) => {

    const [timer, setTimer] = useState(null);

    const handleUpdateContext = (handleUpdate, ...params) => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
  
      setTimer(setTimeout(() => handleUpdate(...params), 1000));
    };

    return (
        <input
            value={value}
            id={formikID}
            onChange={e => {
                handleFormikChange(formikID)(e);
                handleUpdateContext(
                updateAnswer,
                e.target.value,
                contextID,
                valueOfIndex,
                index
                );
            }}
            {...props}
        />
    )
}

export default memo(QuestionInput);
import React, { useState, useMemo } from 'react'


const QuestionInput = ({formikID, contextID, formik, updateAnswer, index, ...props}) => {

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
            id={formikID}
            onChange={e => {
                formik.handleChange(formikID)(e);
                handleUpdateContext(
                updateAnswer,
                e.target.value,
                contextID,
                formik.values.index,
                index
                );
            }}
            {...props}
        />
    )
}

export default QuestionInput
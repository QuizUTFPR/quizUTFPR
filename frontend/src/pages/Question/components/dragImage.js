import React, { useState, memo } from 'react'

import DragZone from '@components/DragZone'

const DragImageInput = ({formikID, handleFormikChange, handlePropsChange, ...props}) => {

    const [timer, setTimer] = useState(null);
    
    const changeContextValue = (files) => {
      handleFormikChange(formikID, URL.createObjectURL(files[0]));
      handleUpdateContext({value: files[0], ...handlePropsChange} );
    }

    //props.teste(props.id, URL.createObjectURL(files[0]))
    
    const handleUpdateContext = ({handleUpdate, ...params}) => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      setTimer(setTimeout(() => handleUpdate({...params}), 500));
    };


    return (
        <DragZone
            handleChange={changeContextValue}
            {...props}
        />
    )
}

export default memo(DragImageInput);
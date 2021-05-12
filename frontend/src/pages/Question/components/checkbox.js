import React, { useState, memo } from 'react'

import { Checkbox } from "@material-ui/core";

const CheckBoxInput = ({formikID, handleFormikChange, handlePropsChange, ...props}) => {

    const [timer, setTimer] = useState(null);

    const handleUpdateContext = ({handleUpdate, ...params}) => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      setTimer(setTimeout(() => handleUpdate({...params}), 500));
    };

    return (
        <Checkbox
            id={formikID}
            onChange={e => {
                handleFormikChange(formikID)(e);
                handleUpdateContext({value: e.target.checked, ...handlePropsChange} );
            }}
            {...props}
        />
    )
}

export default memo(CheckBoxInput);
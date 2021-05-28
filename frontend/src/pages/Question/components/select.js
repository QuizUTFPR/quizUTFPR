import React, { useState } from 'react';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import { TextField } from '@material-ui/core';

const SelectInput = ({
  children,
  formikID,
  handleFormikChange,
  handlePropsChange,
  ...props
}) => {
  const [timer, setTimer] = useState(null);

  const { setTyping } = useQuestionQuiz();

  const handleUpdateContext = ({ handleUpdate, ...params }) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    setTimer(
      setTimeout(() => {
        handleUpdate({ ...params });
        setTyping(false);
      }, 500)
    );
  };

  return (
    <TextField
      id={formikID}
      onChange={(e) => {
        setTyping(true);
        handleFormikChange(formikID)(e);
        handleUpdateContext({ value: e.target.value, ...handlePropsChange });
      }}
      {...props}
      select
      SelectProps={{ native: true }}
    >
      {children}
    </TextField>
  );
};

export default SelectInput;

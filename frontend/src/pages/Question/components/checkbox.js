import React, { useState, memo } from 'react';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import { Checkbox } from '@material-ui/core';

const CheckBoxInput = ({
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
    <Checkbox
      id={formikID}
      onChange={(e) => {
        setTyping(true);
        handleFormikChange(formikID)(e);
        handleUpdateContext({ value: e.target.checked, ...handlePropsChange });
      }}
      {...props}
    />
  );
};

export default memo(CheckBoxInput);

import React, { useState, useMemo } from 'react';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import { TextField } from '@material-ui/core';

export default function SelectInput({
  children,
  formikID,
  handleFormikChange,
  handlePropsChange,
  ...props
}) {
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

  const mySelect = useMemo(
    () => (
      <MemoizedSelect
        handleUpdateContext={handleUpdateContext}
        formikID={formikID}
        handleFormikChange={handleFormikChange}
        handlePropsChange={handlePropsChange}
        setTyping={setTyping}
        {...props}
      >
        {children}
      </MemoizedSelect>
    ),
    [props.value]
  );

  return <>{mySelect}</>;
}

function MemoizedSelect({
  formikID,
  setTyping,
  handleFormikChange,
  handleUpdateContext,
  handlePropsChange,
  children,
  ...props
}) {
  // console.log(formikID, props.value);
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
}

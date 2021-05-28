import React, { useState, useMemo, useCallback } from 'react';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

export default function QuestionInput({
  formikID,
  handleFormikChange,
  handlePropsChange,
  value,
  ...props
}) {
  const [timer, setTimer] = useState(null);
  const { setTyping, isTyping } = useQuestionQuiz();

  const handleUpdateContext = useCallback(
    ({ handleUpdate, ...params }) => {
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
    },
    [handlePropsChange]
  );

  const myInput = useMemo(
    () => (
      <MemoizedInput
        formikID={formikID}
        handleFormikChange={handleFormikChange}
        handlePropsChange={handlePropsChange}
        handleUpdateContext={handleUpdateContext}
        isTyping={isTyping}
        setTyping={setTyping}
        value={value}
        {...props}
      />
    ),
    [value]
  );

  return <>{myInput}</>;
}

function MemoizedInput({
  value,
  formikID,
  isTyping,
  setTyping,
  handleFormikChange,
  handleUpdateContext,
  handlePropsChange,
  ...props
}) {
  console.log(formikID, value);
  return (
    <input
      value={value}
      id={formikID}
      onChange={(e) => {
        if (!isTyping) {
          setTyping(true);
        }
        handleFormikChange(formikID)(e);
        handleUpdateContext({ value: e.target.value, ...handlePropsChange });
      }}
      {...props}
    />
  );
}

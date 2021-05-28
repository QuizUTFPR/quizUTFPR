import React, { useState, useMemo, useCallback } from 'react';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import { Checkbox } from '@material-ui/core';

export default function CheckBoxInput({
  formikID,
  handleFormikChange,
  handlePropsChange,
  checked,
  ...props
}) {
  const [timer, setTimer] = useState(null);
  const { setTyping } = useQuestionQuiz();

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

  const myCheckbox = useMemo(
    () => (
      <MemoizedCheckbox
        formikID={formikID}
        handleFormikChange={handleFormikChange}
        handlePropsChange={handlePropsChange}
        handleUpdateContext={handleUpdateContext}
        checked={checked}
        setTyping={setTyping}
        {...props}
      />
    ),
    [checked]
  );

  return <>{myCheckbox}</>;
}

function MemoizedCheckbox({
  formikID,
  setTyping,
  handleFormikChange,
  handleUpdateContext,
  handlePropsChange,
  checked,
  ...props
}) {
  // console.log(formikID, checked);
  return (
    <Checkbox
      id={formikID}
      checked={checked}
      onChange={(e) => {
        setTyping(true);
        handleFormikChange(formikID)(e);
        handleUpdateContext({ value: e.target.checked, ...handlePropsChange });
      }}
      {...props}
    />
  );
}

import React, { useState, useMemo } from 'react';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import ChipInput from '@components/ChipInput';

export default function TagInput({
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

  const myTagInput = useMemo(
    () => (
      <MemoizedTagInput
        handleUpdateContext={handleUpdateContext}
        formikID={formikID}
        setTyping={setTyping}
        handlePropsChange={handlePropsChange}
        handleFormikChange={handleFormikChange}
        {...props}
      />
    ),
    [props.value, handlePropsChange]
  );

  return <>{myTagInput}</>;
}

function MemoizedTagInput({
  formikID,
  setTyping,
  handleFormikChange,
  handleUpdateContext,
  handlePropsChange,
  ...props
}) {
  // console.log(formikID, props.value);

  return (
    <ChipInput
      id={formikID}
      onChange={(_, tags) => {
        setTyping(true);
        handleFormikChange('question.tags', tags);
        handleUpdateContext({ value: tags, ...handlePropsChange });
      }}
      {...props}
    />
  );
}

import React, { useState } from 'react';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import ChipInput from '@components/ChipInput';

const TagInput = ({
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
};

export default TagInput;

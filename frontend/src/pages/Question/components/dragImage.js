import React, { useState } from 'react';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import DragZone from '@components/DragZone';

const DragImageInput = ({
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

  const changeContextValue = (files) => {
    setTyping(true);
    handleFormikChange(formikID, URL.createObjectURL(files[0]));
    handleUpdateContext({ value: files[0], ...handlePropsChange });
  };

  return <DragZone handleChange={changeContextValue} {...props} />;
};

export default DragImageInput;

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
    handleFormikChange(formikID[0], files[0]);
    handleFormikChange(formikID[1], URL.createObjectURL(files[0]));
    handleUpdateContext({
      value: files[0],
      key: handlePropsChange.key[0],
      index: handlePropsChange.index,
      handleUpdate: handlePropsChange.handleUpdate,
    });
    handleUpdateContext({
      value: URL.createObjectURL(files[0]),
      key: handlePropsChange.key[1],
      index: handlePropsChange.index,
      handleUpdate: handlePropsChange.handleUpdate,
    });
  };

  return <DragZone handleChange={changeContextValue} {...props} />;
};

export default DragImageInput;

import React, { useState, memo } from 'react';

const QuestionInput = ({
  formikID,
  handleFormikChange,
  handlePropsChange,
  ...props
}) => {
  const [timer, setTimer] = useState(null);

  const handleUpdateContext = ({ handleUpdate, ...params }) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    setTimer(setTimeout(() => handleUpdate({ ...params }), 500));
  };

  return (
    <input
      id={formikID}
      onChange={(e) => {
        handleFormikChange(formikID)(e);
        handleUpdateContext({ value: e.target.value, ...handlePropsChange });
      }}
      {...props}
    />
  );
};

export default memo(QuestionInput);

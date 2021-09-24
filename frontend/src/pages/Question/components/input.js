import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

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
    [value, handlePropsChange]
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
  return (
    <input
      value={value}
      id={formikID}
      onChange={(e) => {
        if (!isTyping) {
          setTyping(true);
        }
        console.log('digitou', formikID);
        handleFormikChange(formikID)(e);
        handleUpdateContext({ value: e.target.value, ...handlePropsChange });
      }}
      {...props}
    />
  );
}

QuestionInput.defaultProps = {
  handleFormikChange: () => {},
};

QuestionInput.propTypes = {
  formikID: PropTypes.string.isRequired,
  handleFormikChange: PropTypes.func,
  handlePropsChange: PropTypes.shape({
    handleUpdate: PropTypes.func,
    key: PropTypes.string,
    indexQuestion: PropTypes.number,
    indexAnswer: PropTypes.number,
    indexOtherAnswer: PropTypes.number,
  }).isRequired,
  value: PropTypes.string.isRequired,
};

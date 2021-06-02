import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

export default function RadioInput({
  formikID,
  formikOtherID,
  handleFormikChange,
  handlePropsChange,
  value,
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
      }, 0)
    );
  };

  const myRadio = useMemo(
    () => (
      <MemoizedRadio
        formikID={formikID}
        formikOtherID={formikOtherID}
        handleFormikChange={handleFormikChange}
        handlePropsChange={handlePropsChange}
        handleUpdateContext={handleUpdateContext}
        value={value}
        setTyping={setTyping}
        {...props}
      />
    ),
    [value, handlePropsChange]
  );

  return <>{myRadio}</>;
}

function MemoizedRadio({
  formikID,
  formikOtherID,
  setTyping,
  handleFormikChange,
  handleUpdateContext,
  handlePropsChange,
  value,
  ...props
}) {
  return (
    <input
      type="radio"
      id={formikID}
      name="alternativa"
      value={value}
      onChange={() => {
        const {
          handleUpdate,
          key,
          indexQuestion,
          indexAnswer,
          indexOtherAnswer,
        } = handlePropsChange;
        setTyping(true);
        handleFormikChange(formikID, true);
        handleFormikChange(formikOtherID, false);

        handleUpdateContext({
          value: true,
          handleUpdate,
          key,
          indexQuestion,
          indexAnswer,
        });
        handleUpdateContext({
          value: false,
          handleUpdate,
          key,
          indexQuestion,
          indexAnswer: indexOtherAnswer,
        });
      }}
      {...props}
    />
  );
}

RadioInput.defaultProps = {
  handleFormikChange: () => {},
};

RadioInput.propTypes = {
  formikID: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  formikOtherID: PropTypes.string.isRequired,
  handleFormikChange: PropTypes.func,
  handlePropsChange: PropTypes.shape({
    handleUpdate: PropTypes.func,
    key: PropTypes.string,
    indexQuestion: PropTypes.number,
    indexAnswer: PropTypes.number,
    indexOtherAnswer: PropTypes.number,
  }).isRequired,
};

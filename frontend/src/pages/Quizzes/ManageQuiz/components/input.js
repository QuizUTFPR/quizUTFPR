import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

const QuestionInput = ({
  formikID,
  handleFormikChange,
  handlePropsChange,
  value,
  ...props
}) => {
  const [timer, setTimer] = useState(null);
  const { setTyping, isTyping } = useQuestionQuiz();
  const [text, setText] = useState(value);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    setTimer(
      setTimeout(() => {
        const { handleUpdate, ...params } = handlePropsChange;
        handleUpdate({ ...params, value: text });
        handleFormikChange(formikID)(text);
      }, 500)
    );
  }, [text]);

  return (
    <input
      value={text}
      id={formikID}
      onChange={(e) => {
        if (!isTyping) {
          setTyping(true);
        }
        setText(e.target.value);
        setTyping(false);
      }}
      {...props}
    />
  );
};

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

export default QuestionInput;

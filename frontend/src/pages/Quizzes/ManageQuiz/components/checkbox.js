import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import { Checkbox } from '@mui/material';

const CheckBoxInput = ({
  formikID,
  handleFormikChange,
  handlePropsChange,
  checked,
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
      }, 0)
    );
  };

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
    [checked, handlePropsChange]
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{myCheckbox}</>;
};

const MemoizedCheckbox = ({
  type,
  formikID,
  setTyping,
  handleFormikChange,
  handleUpdateContext,
  handlePropsChange,
  checked,
  ...props
}) => {
  return (
    <Checkbox
      id={formikID}
      checked={checked}
      onChange={(e) => {
        setTyping(true);
        handleFormikChange(formikID)(e);
        handleUpdateContext({
          value: e.target.checked,
          ...handlePropsChange,
        });
      }}
      {...props}
    />
  );
};

CheckBoxInput.defaultProps = {
  handleFormikChange: () => {},
};

CheckBoxInput.propTypes = {
  formikID: PropTypes.string.isRequired,
  handleFormikChange: PropTypes.func,
  handlePropsChange: PropTypes.shape({
    handleUpdate: PropTypes.func,
    key: PropTypes.string,
    indexQuestion: PropTypes.number,
    indexAnswer: PropTypes.number,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
};

export default CheckBoxInput;

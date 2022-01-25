import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import { TextField } from '@mui/material';

const SelectInput = ({
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

  const mySelect = useMemo(
    () => (
      <MemoizedSelect
        handleUpdateContext={handleUpdateContext}
        formikID={formikID}
        handleFormikChange={handleFormikChange}
        handlePropsChange={handlePropsChange}
        setTyping={setTyping}
        {...props}
      >
        {children}
      </MemoizedSelect>
    ),
    [props.value, handlePropsChange]
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{mySelect}</>;
};

const MemoizedSelect = ({
  formikID,
  setTyping,
  handleFormikChange,
  handleUpdateContext,
  handlePropsChange,
  children,
  ...props
}) => {
  return (
    <TextField
      id={formikID}
      onChange={(e) => {
        setTyping(true);
        handleFormikChange(formikID)(e);
        handleUpdateContext({ value: e.target.value, ...handlePropsChange });
      }}
      {...props}
      select
      SelectProps={{ native: true }}
    >
      {children}
    </TextField>
  );
};

SelectInput.defaultProps = {
  handleFormikChange: () => {},
  // eslint-disable-next-line react/jsx-no-useless-fragment
  children: <></>,
  handlePropsChange: {
    handleUpdate: () => {},
    key: '',
    index: 0,
    value: '',
  },
};

SelectInput.propTypes = {
  children: PropTypes.node,
  formikID: PropTypes.string.isRequired,
  handleFormikChange: PropTypes.func,
  handlePropsChange: PropTypes.shape({
    handleUpdate: PropTypes.func,
    key: PropTypes.string,
    index: PropTypes.number,
    value: PropTypes.string,
  }),
};

export default SelectInput;

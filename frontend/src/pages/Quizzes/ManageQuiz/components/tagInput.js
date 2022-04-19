import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

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

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{myTagInput}</>;
};

const MemoizedTagInput = ({
  formikID,
  setTyping,
  handleFormikChange,
  handleUpdateContext,
  handlePropsChange,
  ...props
}) => {
  return (
    <ChipInput
      id={formikID}
      onChange={(_, tags) => {
        setTyping(true);
        const formatedTags = [
          ...new Set(tags.map((element) => element.toLowerCase().trim())),
        ];
        handleFormikChange('question.tags', formatedTags);
        handleUpdateContext({ value: formatedTags, ...handlePropsChange });
      }}
      {...props}
    />
  );
};

TagInput.defaultProps = {
  handleFormikChange: () => {},
  // eslint-disable-next-line react/jsx-no-useless-fragment
  children: <></>,
};

TagInput.propTypes = {
  children: PropTypes.node,
  formikID: PropTypes.string.isRequired,
  handleFormikChange: PropTypes.func,
  handlePropsChange: PropTypes.shape({
    handleUpdate: PropTypes.func,
    key: PropTypes.string,
    index: PropTypes.number,
  }).isRequired,
};

export default TagInput;

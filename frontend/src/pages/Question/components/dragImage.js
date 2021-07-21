import React, { useState } from 'react';
import PropTypes from 'prop-types';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

// COMPONENTS
import DragZone from '@components/DragZone';

// UTILS
import getBase64 from '@utils/getBase64OfImage';

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

  const changeContextValue = async (files) => {
    const imageBase64 = await getBase64(files[0]);

    setTyping(true);
    handleFormikChange(formikID[0], files[0]);
    // handleFormikChange(formikID[1], URL.createObjectURL(files[0]));
    handleFormikChange(formikID[1], imageBase64);

    handleUpdateContext({
      value: files[0],
      key: handlePropsChange.key[0],
      index: handlePropsChange.index,
      handleUpdate: handlePropsChange.handleUpdate,
    });
    handleUpdateContext({
      value: imageBase64,
      key: handlePropsChange.key[1],
      index: handlePropsChange.index,
      handleUpdate: handlePropsChange.handleUpdate,
    });
  };

  return <DragZone handleChange={changeContextValue} {...props} />;
};

DragImageInput.defaultProps = {
  handleFormikChange: () => {},
};

DragImageInput.propTypes = {
  formikID: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFormikChange: PropTypes.func,
  handlePropsChange: PropTypes.shape({
    handleUpdate: PropTypes.func,
    key: PropTypes.arrayOf(PropTypes.string),
    index: PropTypes.number,
  }).isRequired,
};

export default DragImageInput;

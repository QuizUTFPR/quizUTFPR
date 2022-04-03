import React, { useEffect, useState } from 'react';
// import { useRoute } from '@react-navigation/native';

// Components
import Container from '@components/Container';
import Toast from '@components/Toast';

// STYLES
import useSearchQuizByTag from '@hook/useSearchQuizByTag';
import { SafeArea } from './style';

// HOOKS

const SearchTag = () => {
  const { messageError, setMessageError } = useSearchQuizByTag();

  const [showToast, setShowToast] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  const handleCloseToast = () => {
    setShowToast({
      open: false,
      message: '',
    });

    setMessageError(false);
  };

  useEffect(() => {
    if (messageError) {
      setShowToast({
        open: true,
        message: messageError,
      });
    }
  }, [messageError]);

  return (
    <>
      <Container>
        <SafeArea />
      </Container>
      <Toast
        type="error"
        handleClose={handleCloseToast}
        open={showToast.open}
        timeToErase={1000}
      >
        {showToast.message}
      </Toast>
    </>
  );
};
export default SearchTag;

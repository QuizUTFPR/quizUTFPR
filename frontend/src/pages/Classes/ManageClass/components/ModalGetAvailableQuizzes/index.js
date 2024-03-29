import React, { useState, useEffect, forwardRef } from 'react';
import api from '@api';
import { useParams } from 'react-router-dom';

// Components
import { Close } from '@mui/icons-material';
import { IconButton, Grid, Typography, Divider } from '@mui/material';
import SnackBar from '@components/SnackBar';
import Quiz from './Quiz';

// Style
import { FormWrapper, GridContainerModal } from './style';

const ModalGetAvailableQuizzes = forwardRef((props, _) => {
  const { handleClose, handleUpdateQuizzes } = props;
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [stateSnackBar, setStateSnackBar] = useState({
    open: false,
    text: '',
    severity: '',
    autoHideDuration: 1000,
  });
  const [checkboxes, setCheckboxes] = useState([]);

  const { idClass } = useParams();

  const getAvailableQuizzes = async () => {
    try {
      const response = await api.post('/teacherClass/availableQuizzes', {
        idClass,
      });

      if (response.status !== 200) setAvailableQuizzes([]);
      else setAvailableQuizzes(response.data);
    } catch (error) {
      console.log('Published teacher quizzes error:', error);
    }
  };

  const handleClickSnackBar = (
    text,
    severity,
    checked = false,
    autoHideDuration = 1000
  ) => {
    if (!checked) {
      setTimeout(() => {
        setStateSnackBar({ text, open: true, severity, autoHideDuration });
      }, 250);
    } else {
      setStateSnackBar({ text, open: true, severity, autoHideDuration });
    }
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setStateSnackBar((prevState) => ({ ...prevState, open: false }));
  };

  const handleAddQuiz = async (idQuiz) => {
    try {
      await api.post('/teacherClass/attachQuiz', {
        idClass,
        idQuiz,
      });
      handleClickSnackBar(
        'Quiz adicionado com sucesso!',
        'success',
        checkboxes[idQuiz]
      );
      handleUpdateQuizzes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveQuiz = async (idQuiz) => {
    try {
      await api.delete('/teacherClass/dettachQuiz', {
        data: {
          idClass,
          idQuiz,
        },
      });

      handleUpdateQuizzes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuizzesChecked = (quiz) => (e) => {
    e.preventDefault();
    setCheckboxes((prevState) => ({
      ...prevState,
      [quiz.id]: e.target.checked,
    }));

    if (e.target.checked) {
      handleAddQuiz(quiz.id);
    } else {
      handleRemoveQuiz(quiz.id);
    }
  };

  useEffect(() => {
    getAvailableQuizzes();

    return () => setAvailableQuizzes([]);
  }, []);

  return (
    <>
      <GridContainerModal
        container
        spacing={3}
        style={{
          maxHeight: '90vh',
          flexWrap: 'nowrap',
          overflow: 'auto',
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={3} md={1}>
            <IconButton aria-label="closeModal" onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>

          <Grid item xs={9} md={11}>
            <Typography variant="h5" color="primary">
              Vincular Quizzes
            </Typography>
          </Grid>
        </Grid>

        <Grid item style={{ marginBottom: '10px' }}>
          <Divider />
        </Grid>

        <FormWrapper
          container
          component="form"
          // onSubmit={formik.handleSubmit}
          spacing={2}
          item
          xs={12}
        >
          {availableQuizzes.map((quiz, index) => (
            <Grid
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              item
              xs={12}
            >
              <Quiz
                quiz={quiz}
                checked={checkboxes[quiz.id]}
                id={quiz.id}
                onChange={() => handleQuizzesChecked(quiz)}
              />
            </Grid>
          ))}
        </FormWrapper>
      </GridContainerModal>
      <SnackBar
        openSnackBar={stateSnackBar.open}
        handleCloseSnackBar={handleCloseSnackBar}
        autoHideDuration={stateSnackBar.autoHideDuration}
        text={stateSnackBar.text}
        severity={stateSnackBar.severity}
      />
    </>
  );
});

export default ModalGetAvailableQuizzes;

import React, { forwardRef, useState } from 'react';

// COMPONENTS
import Modal from '@components/Modal';
import Button from '@components/Button';
import { IconButton, Grid, Typography, Divider } from '@material-ui/core';

// ASSETS
import { Save, Search, Close } from '@material-ui/icons/';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';
import QuestionDatabase from '../QuestionDatabase';

// STYLE
import { StyledWrapper } from './style';

// eslint-disable-next-line no-unused-vars
const TypeOfQuestion = forwardRef((props, ref) => {
  const {
    questions,
    addQuestion,
    removeQuestion,
    MockupQuestionTrueOrFalse,
    MockupQuestionMultipleChoice,
  } = useQuestionQuiz();

  const [isModalQuestionDatabaseOpen, setModalQuestionDatabaseOpen] =
    useState(false);
  const handleOpenModalQuestionDB = () => setModalQuestionDatabaseOpen(true);
  const handleCloseModalQuestionDB = () => setModalQuestionDatabaseOpen(false);

  const handleAddQuestion = (mockup) => () => {
    addQuestion(mockup);
    props.updateScreen(mockup, questions.length)();
    props.handleClose();
  };

  return (
    <>
      <StyledWrapper
        container
        spacing={3}
        isVisible={isModalQuestionDatabaseOpen}
      >
        <Grid container justify="center" alignItems="center">
          <Grid item xs={3} md={1}>
            <IconButton aria-label="closeModal" onClick={props.handleClose}>
              <Close />
            </IconButton>
          </Grid>

          <Grid item xs={9} md={11}>
            <Typography variant="h5" color="primary">
              Qual tipo de questão deseja criar?
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Divider />
        </Grid>

        <Grid container spacing={3} justify="center" align="center">
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={handleOpenModalQuestionDB}
              variant="contained"
              startIcon={<Search />}
              color="primary"
            >
              USAR QUESTÃO DO BANCO
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              startIcon={<Save />}
              color="secondary"
              variant="outlined"
              onClick={handleAddQuestion(MockupQuestionMultipleChoice)}
            >
              Multipla Escolha
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              startIcon={<Save />}
              color="secondary"
              variant="outlined"
              onClick={handleAddQuestion(MockupQuestionTrueOrFalse)}
            >
              Verdadeiro ou Falso
            </Button>
          </Grid>
        </Grid>
      </StyledWrapper>

      <Modal
        open={isModalQuestionDatabaseOpen}
        modalTitle="Utilizar questões do banco de dados"
        modalDescription="As questões são buscadas utilizando tag's"
        style={{ overflow: 'scroll' }}
      >
        <QuestionDatabase
          questions={questions}
          handleaddQuestion={addQuestion}
          handleRemoveQuestion={removeQuestion}
          handleClose={handleCloseModalQuestionDB}
        />
      </Modal>
    </>
  );
});

export default TypeOfQuestion;

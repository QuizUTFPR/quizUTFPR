import React, { useState } from 'react';

// COMPONENTS
import Modal from '@components/Modal';
import Button from '@components/Button';
import { IconButton, Grid, Typography, Divider } from '@mui/material';
import GridContainer from '@components/Container';

// ASSETS
import { Save, Search, Close } from '@mui/icons-material/';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';
import QuestionDatabase from '../ModalQuestionDatabase';

const TypeOfQuestion = ({ updateScreen, handleClose }) => {
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
    updateScreen(mockup, questions.length)();
    handleClose();
  };

  return (
    <>
      {!isModalQuestionDatabaseOpen && (
        <GridContainer container spacing={3}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={3} md={1}>
              <IconButton aria-label="closeModal" onClick={handleClose}>
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

          <Grid container spacing={3} justifyContent="center" align="center">
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
        </GridContainer>
      )}

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
};

export default TypeOfQuestion;

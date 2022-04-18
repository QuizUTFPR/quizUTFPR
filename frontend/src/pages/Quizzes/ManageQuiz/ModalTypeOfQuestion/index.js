import React, { forwardRef } from 'react';

// COMPONENTS
import Modal from '@components/Modal';
import Button from '@components/Button';
import { IconButton, Grid, Typography, Divider } from '@mui/material';
import Wrapper from '@components/RefferedContainer';
import { Save, Search, Close } from '@mui/icons-material/';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

// MODALS
import QuestionDatabase from '../ModalQuestionDatabase';
import SheetQuestions from '../SheetQuestionModal';

const TypeOfQuestion = forwardRef((props, ref) => {
  const {
    updateScreen,
    handleClose,
    isModalQuestionDatabaseOpen,
    toogleModalQuestionDB,
    isModalSheetQuestionOpen,
    toogleModalSheetQuestionOpen,
  } = props;

  const {
    questions,
    addQuestion,
    removeQuestion,
    MockupQuestionTrueOrFalse,
    MockupQuestionMultipleChoice,
  } = useQuestionQuiz();

  const handleAddMockupQuestion = (mockup) => () => {
    addQuestion(mockup);
    updateScreen(mockup, questions.length)();
    handleClose();
  };

  return (
    <>
      {!isModalQuestionDatabaseOpen && (
        <Wrapper container spacing={3}>
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
                onClick={toogleModalQuestionDB}
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
                onClick={handleAddMockupQuestion(MockupQuestionMultipleChoice)}
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
                onClick={handleAddMockupQuestion(MockupQuestionTrueOrFalse)}
              >
                Verdadeiro ou Falso
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                startIcon={<Save />}
                color="secondary"
                variant="outlined"
                onClick={toogleModalSheetQuestionOpen}
              >
                Importar Planilha de Questões
              </Button>
            </Grid>
          </Grid>
        </Wrapper>
      )}

      <Modal
        open={isModalQuestionDatabaseOpen}
        modalTitle="Utilizar questões do banco de dados"
        modalDescription="As questões são buscadas utilizando tag's"
        style={{ overflow: 'scroll' }}
      >
        <QuestionDatabase
          handleaddQuestion={addQuestion}
          handleRemoveQuestion={removeQuestion}
          handleClose={toogleModalQuestionDB}
        />
      </Modal>

      <Modal
        open={isModalSheetQuestionOpen}
        modalTitle="Importar questões a planilha"
        modalDescription=""
        style={{ overflow: 'scroll' }}
      >
        <SheetQuestions
          modalDescription=""
          modalTitle="Importar questões a planilha"
          handleClose={() => {
            toogleModalSheetQuestionOpen();
            handleClose();
          }}
        />
      </Modal>
    </>
  );
});

export default TypeOfQuestion;

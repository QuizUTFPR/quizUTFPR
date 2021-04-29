import React, { useState } from "react";

import {
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  Checkbox
} from "@material-ui/core";

import {
  StyledRightGrid,
  StyledLeftGrid,
  ContainerGrid,
  StyledFieldOfQuestion
} from "./style";

//HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz'

// COMPONENTS
import Modal from '@components/Modal'
import QuestionDatabase from './QuestionDatabase'

const Question = () => {
  const {questions, setQuestions, addQuestion, removeQuestion} = useQuestionQuiz();

  console.log("Questões do Quiz:",questions)

  const [isModalQuestionDatabaseOpen, setModalQuestionDatabaseOpen] = useState(false);
  const handleOpenQuestionDatabaseModal = () => setModalQuestionDatabaseOpen(true);
  const handleCloseQuestionDatabaseModal = () => setModalQuestionDatabaseOpen(false);


  return (
    <>
    <ContainerGrid container justify="space-between">
      <Grid item xs={2}>
        <StyledLeftGrid container align='center' >
          <Grid item xs={12}>
            <Typography color="primary" component="h5" variant="h5">
              Questões
            </Typography>
          </Grid>

          {questions.map((item) => (
            <Grid item xs={12} key={item.title}>
              <Button color="primary" variant='outlined' fullWidth>
                {item.title}
              </Button>
          </Grid>
          ))}
        </StyledLeftGrid>
      </Grid>

      <Grid item xs={8}>
        <Grid container>
          <Grid container justify="space-around">
            <Grid item xs={3}>
              <Button fullWidth  variant="contained" color="primary">
                CRIAR NOVA QUESTÃO
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth onClick={handleOpenQuestionDatabaseModal}  variant="contained" color="primary">
                USAR QUESTÃO DO BANCO
              </Button>
            </Grid>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <StyledFieldOfQuestion container justify="center">
            <Grid item>
              <TextField
                fullWidth
                label="Título da Questão..."
                id="title"
                value={""}
                onChange={() => {}}
                required
                autoFocus
              />
            </Grid>

            <Grid item>
              <TextField
                type="file"
                name="Imagem de Capa"
                id="file"
                onChange={event => console.log("file:", event.target.files[0])}
              />
            </Grid>

            <Grid item>
              <Grid container>
                <Grid item>
                  <Checkbox defaultChecked size="small" color="primary" />
                  <TextField
                    fullWidth
                    label="Questão 1"
                    id="firstQuestion"
                    value={""}
                    onChange={() => {}}
                    required
                  />
                </Grid>

                <Grid item>
                  <Checkbox defaultChecked size="small" color="primary" />
                  <TextField
                    fullWidth
                    label="Questão 2"
                    id="secondQuestion"
                    value={""}
                    onChange={() => {}}
                    required
                  />
                </Grid>

                <Grid item>
                  <Checkbox defaultChecked size="small" color="primary" />
                  <TextField
                    fullWidth
                    label="Questão 3"
                    id="thirdQuestion"
                    value={""}
                    onChange={() => {}}
                  />
                </Grid>

                <Grid item>
                  <Checkbox defaultChecked size="small" color="primary" />
                  <TextField
                    fullWidth
                    label="Questão 4"
                    id="foirthQuestion"
                    value={""}
                    onChange={() => {}}
                  />
                </Grid>
              </Grid>
            </Grid>
          </StyledFieldOfQuestion>

          <Grid item>
            <Divider />
          </Grid>

          <Grid container justify="space-around">
            <Grid item xs={3} >
              <Button fullWidth variant="contained" color="secondary">
                CANCELAR
              </Button>
            </Grid>
            <Grid item xs={3} >
              <Button fullWidth variant="contained" color="primary">
                FINALIZAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <StyledRightGrid container align="center" justify="center">
          <Grid item>
            <Typography color="primary" component="h5" variant="h5">
              Detalhes
            </Typography>
          </Grid>
        </StyledRightGrid>
      </Grid>
    </ContainerGrid>
    
    {/* MODALS */}
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
        handleClose={handleCloseQuestionDatabaseModal}
      />
    </Modal>

    </>
  );
};

export default Question;

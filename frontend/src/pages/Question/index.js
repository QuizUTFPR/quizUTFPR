import React, { useState } from "react";

import {
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  AppBar,
  Toolbar
} from "@material-ui/core";

import {
  StyledRightGrid,
  StyledLeftGrid,
  ContainerGrid,
  StyledFieldOfQuestion,
  StyledAnswerInput,
  StyledTitleInput,
  StyledButtonsContainer
} from "./style";

//HOOKS
import useQuestionQuiz from "@hooks/QuestionQuiz";

// COMPONENTS
import Modal from "@components/Modal";
import QuestionDatabase from "./QuestionDatabase";

const Question = () => {
  const { questions, addQuestion, removeQuestion } = useQuestionQuiz();

  console.log("Questões do Quiz:", questions);

  const [isModalQuestionDatabaseOpen, setModalQuestionDatabaseOpen] = useState(
    false
  );
  const handleOpenQuestionDatabaseModal = () =>
    setModalQuestionDatabaseOpen(true);
  const handleCloseQuestionDatabaseModal = () =>
    setModalQuestionDatabaseOpen(false);

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Grid container justify="space-between">
            <Button color="secondary" variant="outlined">
              Sair
            </Button>
            <Button color="primary" variant="contained">
              Finalzar
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <ContainerGrid container justify="space-between">
        <Grid item xs={2}>
          <StyledLeftGrid container align="center">
            <Grid item xs={12}>
              <Typography color="primary" component="h5" variant="h5">
                Questões
              </Typography>
            </Grid>

            {questions.map(item => (
              <Grid item xs={12} key={item.title}>
                <Button color="primary" variant="outlined" fullWidth>
                  {item.title}
                </Button>
              </Grid>
            ))}
          </StyledLeftGrid>
        </Grid>

        <Grid item xs={8}>
          <Grid container>
            <StyledButtonsContainer container justify="space-around">
              <Grid item xs={3}>
                <Button fullWidth variant="contained" color="primary">
                  CRIAR NOVA QUESTÃO
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  onClick={handleOpenQuestionDatabaseModal}
                  variant="contained"
                  color="primary"
                >
                  USAR QUESTÃO DO BANCO
                </Button>
              </Grid>
            </StyledButtonsContainer>

            <StyledFieldOfQuestion container justify="center" spacing={5}>
              <Grid item xs={12}>
                <StyledTitleInput
                  fullWidth
                  placeholder="Digite o enunciado aqui..."
                  id="title"
                  // value={""}
                  // onChange={() => {}}
                  required
                  autoFocus
                />
              </Grid>

              <Grid item>
                <TextField
                  type="file"
                  name="Imagem de Capa"
                  id="file"
                  onChange={event =>
                    console.log("file:", event.target.files[0])
                  }
                />
              </Grid>

              <Grid container spacing={2} justify="space-between">
                <Grid item xs={12} md={6}>
                  <StyledAnswerInput
                    type="text"
                    placeholder="Digite a alternativa 1..."
                    id="firstQuestion"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledAnswerInput
                    fullWidth
                    placeholder="Digite a alternativa 2..."
                    id="secondQuestion"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledAnswerInput
                    fullWidth
                    placeholder="Digite a alternativa 3..."
                    id="thirdQuestion"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledAnswerInput
                    fullWidth
                    placeholder="Digite a alternativa 4..."
                    id="fourthQuestion"
                  />
                </Grid>
              </Grid>
            </StyledFieldOfQuestion>
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
        style={{ overflow: "scroll" }}
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

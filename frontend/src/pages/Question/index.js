import React, { useState } from "react";

import {
  Grid,
  Typography,
  TextField,
  AppBar,
  Toolbar,
  Button
} from "@material-ui/core";

import {
  StyledRightGrid,
  StyledLeftGrid,
  ContainerGrid,
  StyledAnswerInput,
  StyledTitleInput,
  StyledGrid,
  GridButtonNewQuestion
} from "./style";

//HOOKS
import useQuestionQuiz from "@hooks/QuestionQuiz";

// COMPONENTS
import Modal from "@components/Modal";
import TypeOfQuestion from '../TypeOfQuestion'
import StyledButton from '@components/Button'


const Question = () => {
  const { questions } = useQuestionQuiz();

  console.log("Questões do Quiz:", questions);

  const [isModalTypeOfQuestionOpen, setModalTypeOfQuestionOpen] = useState(false);

  const handleOpenModalTypeQuestion = () => setModalTypeOfQuestionOpen(true);
  const handleCloseModalTypeQuestion = () => setModalTypeOfQuestionOpen(false);

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Grid container justify="space-between" alignItems='center'>
            <StyledButton color="secondary" variant="outlined">
              Sair
            </StyledButton>
            

            <Typography component="h4" variant="h4" color="primary">
              Título do Quiz
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>


      <ContainerGrid container>

        {/* LEFT */}
        <Grid item xs={2}>
          <StyledLeftGrid container align="center">
            <Grid item xs={12}>
              <Typography color="primary" component="h5" variant="h5">
                Questões
              </Typography>
            </Grid>

            <Grid container>
              {questions.map(item => (
                <Grid item xs={12} key={item.title}>
                  <Button color="primary" variant="outlined" fullWidth>
                    {item.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <GridButtonNewQuestion item xs={12}>
              <StyledButton 
                onClick={handleOpenModalTypeQuestion} 
                fullWidth variant="contained" 
                color="primary"
              >
                CRIAR NOVA QUESTÃO
              </StyledButton>
            </GridButtonNewQuestion>
          </StyledLeftGrid>
        </Grid>


        {/* MIDDLE */}
        <Grid item xs={8}>
            <StyledGrid container justify="center">
              <Grid item xs={12}>
                <StyledTitleInput
                  fullWidth
                  placeholder="DIGITE O ENUNCIADO AQUI"
                  id="title"
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

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledAnswerInput
                    type="text"
                    placeholder="DIGITE A ALTERNATIVA 1"
                    id="firstQuestion"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledAnswerInput
                    fullWidth
                    placeholder="DIGITE A ALTERNATIVA 2"
                    id="secondQuestion"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledAnswerInput
                    fullWidth
                    placeholder="DIGITE A ALTERNATIVA 3"
                    id="thirdQuestion"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <StyledAnswerInput
                    fullWidth
                    placeholder="DIGITE A ALTERNATIVA 4"
                    id="fourthQuestion"
                  />
                </Grid>
              </Grid>
            
            <Grid item xs={12}>
              <StyledButton fullWidth color="primary" variant="contained">
                  FINALIZAR
              </StyledButton>
            </Grid>
            </StyledGrid>
          </Grid>
          

        {/* RIGHT */}
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
        open={isModalTypeOfQuestionOpen}
        modalTitle="Qual tipo de questão deseja criar?"
        modalDescription="Escolha o tipo da questão..."
        style={{ overflow: "scroll" }}
      >
        <TypeOfQuestion
          handleClose={handleCloseModalTypeQuestion}
        />
        
      </Modal>
    </>
  );
};

export default Question;

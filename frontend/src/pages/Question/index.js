import React, { useState } from "react";
import { useFormik } from "formik";

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
  GridButtonNewQuestion,
  GridRegisterQuestion
} from "./style";

//HOOKS
import useQuestionQuiz from "@hooks/QuestionQuiz";

// COMPONENTS
import Modal from "@components/Modal";
import TypeOfQuestion from '../TypeOfQuestion'
import StyledButton from '@components/Button'


const Question = () => {
  const { questions } = useQuestionQuiz();

  const [isModalTypeOfQuestionOpen, setModalTypeOfQuestionOpen] = useState(false);
  const handleOpenModalTypeQuestion = () => setModalTypeOfQuestionOpen(true);
  const handleCloseModalTypeQuestion = () => setModalTypeOfQuestionOpen(false);
  
  const [questionOnScreen, setQuestionOnScreen] = useState(questions[0]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: questionOnScreen,
    onSubmit: values => {
      console.log(values)
    }
  });

  const handleChangeQuestion = (question) => () => {
    setQuestionOnScreen(question);
  }

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
              {questions.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Button color="primary" variant="outlined" fullWidth onClick={handleChangeQuestion(item)}>
                    {item.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <GridButtonNewQuestion item xs={12}>
              <StyledButton 
                onClick={handleOpenModalTypeQuestion} 
                fullWidth variant="contained" 
                color="secondary"
              >
                CRIAR NOVA QUESTÃO
              </StyledButton>
            </GridButtonNewQuestion>
          </StyledLeftGrid>
        </Grid>


        {/* MIDDLE */}
        <Grid item xs={8}>
            <StyledGrid container justify="center" align='center' component='form' onSubmit={formik.handleSubmit}>
              <Grid item xs={12}>
                <StyledTitleInput
                  fullWidth
                  placeholder="DIGITE O ENUNCIADO AQUI"
                  id="title"
                  required
                  autoFocus
                  value={formik.values.title}
                  onChange={formik.handleChange}
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

              <Grid container align='center' justify='center' spacing={2}>
                {formik.values.answer.map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <StyledAnswerInput
                      type="text"
                      placeholder={`DIGITE A ALTERNATIVA ${index+1}`}
                      id={`answer[${index}].title`}
                      value={item.title}
                      onChange={formik.handleChange}
                      required
                    />
                  </Grid>
                ))}
              </Grid>
            
            <GridRegisterQuestion item xs={12}>
              <StyledButton type='submit' fullWidth color="primary" variant="contained">
                  SALVAR ALTERAÇÕES
              </StyledButton>
            </GridRegisterQuestion>
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

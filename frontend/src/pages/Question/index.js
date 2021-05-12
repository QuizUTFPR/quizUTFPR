import React, { useState } from "react";
import { useFormik } from "formik";

import ChipInput from "@components/ChipInput";

import {
  Grid,
  Typography,
  TextField,
  Toolbar,
  Button,
  Box,
  MenuItem,
  Checkbox
} from "@material-ui/core";

import {
  StyledRightGrid,
  StyledLeftGrid,
  ContainerGrid,
  StyledAnswerInput,
  StyledTitleInput,
  StyledGrid,
  GridButtonNewQuestion,
  GridRegisterQuestion,
  StyledAppBar
} from "./style";

//HOOKS
import useQuestionQuiz from "@hooks/QuestionQuiz";

// COMPONENTS
import Modal from "@components/Modal";
import StyledButton from "@components/Button";

// PAGES
import TypeOfQuestion from "../TypeOfQuestion";

const Question = () => {
  const { questions, updateQuestion, updateAnswer } = useQuestionQuiz();

  const [isModalTypeOfQuestionOpen, setModalTypeOfQuestionOpen] = useState(
    false
  );
  const handleOpenModalTypeQuestion = () => setModalTypeOfQuestionOpen(true);
  const handleCloseModalTypeQuestion = () => setModalTypeOfQuestionOpen(false);

  const [questionOnScreen, setQuestionOnScreen] = useState({
    index: 0,
    question: questions[0]
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: questionOnScreen
  });

  const handleChangeQuestion = (question, index) => () => {
    console.log("mudou")
    setQuestionOnScreen({ index, question });
    console.log(question)
  };


  return (
    <>
      <StyledAppBar position="static" color="transparent">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <StyledButton color="secondary" variant="outlined">
                Sair
              </StyledButton>
            </Grid>

            <Grid item>
              <Typography component="h4" variant="h4" color="primary">
                Título do Quiz
              </Typography>
            </Grid>

            <Box>
              <StyledButton
                style={{ marginRight: "20px" }}
                color="primary"
                variant="outlined"
              >
                Salvar
              </StyledButton>
              <StyledButton color="primary" variant="contained">
                Finalizar
              </StyledButton>
            </Box>
          </Grid>
        </Toolbar>
      </StyledAppBar>

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
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={handleChangeQuestion(item, index)}
                  >
                    {item.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <GridButtonNewQuestion item xs={12}>
              <StyledButton
                onClick={handleOpenModalTypeQuestion}
                fullWidth
                variant="contained"
                color="secondary"
              >
                CRIAR NOVA QUESTÃO
              </StyledButton>
            </GridButtonNewQuestion>
          </StyledLeftGrid>
        </Grid>

        {/* MIDDLE */}
        <Grid item xs={8}>
          <StyledGrid container justify="center" align="center">
            <Grid item xs={12}>
              <StyledTitleInput
                placeholder="DIGITE O ENUNCIADO AQUI"
                id="title"
                required
                autoFocus
                value={formik.values.question.title}
                onChange={e => {
                  formik.handleChange("question.title")(e);
                  updateQuestion(e.target.value, "title", formik.values.index);
                }}
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

            <Grid container align="center" justify="center" spacing={2}>
              {formik.values.question.answer.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Checkbox
                    id={`question.answer[${index}].is_correct`}
                    checked={Boolean(item.is_correct)}
                    onChange={e => {
                      formik.handleChange(
                        `question.answer[${index}].is_correct`
                      )(e);
                      updateAnswer(
                        e.target.checked,
                        "is_correct",
                        formik.values.index,
                        index
                      );
                    }}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <StyledAnswerInput
                    type="text"
                    placeholder={`DIGITE A ALTERNATIVA ${index + 1}`}
                    formikID={`question.answer[${index}].title`}
                    contextID="title"
                    value={item.title}
                    handleFormikChange={formik.handleChange}
                    updateAnswer={updateAnswer}
                    index={index}
                    valueOfIndex={formik.values.index}
                    required
                  />
                </Grid>
              ))}
            </Grid>

            <GridRegisterQuestion item xs={6}>
              <StyledButton
                type="submit"
                fullWidth
                color="secondary"
                variant="outlined"
              >
                Excluir Questão
              </StyledButton>
            </GridRegisterQuestion>
          </StyledGrid>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={2}>
          <StyledRightGrid container align="center" direction="column">
            <Grid item style={{ marginBottom: "40px" }}>
              <Typography color="primary" component="h5" variant="h5">
                Detalhes
              </Typography>
            </Grid>

            <Grid item style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label="Tempo"
                id="time"
                name="time"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                // value={formik.values.visibility}
                // onChange={event =>
                //   formik.setFieldValue("visibility", event.target.value)
                // }
                required
                select
              >
                <MenuItem value={30}>30 segundos</MenuItem>
              </TextField>
            </Grid>

            {/* <Grid item style={{marginBottom: '20px'}}>
              <TextField
                fullWidth
                label="Alternativa Correta"
                id="correctAnswer"
                name="correctAnswer"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                // value={formik.values.visibility}
                // onChange={event =>
                //   formik.setFieldValue("visibility", event.target.value)
                // }
                required
                select
              >
                <MenuItem value="1">1</MenuItem>
              </TextField>
            </Grid> */}

            <Grid item style={{ marginBottom: "20px" }}>
              <ChipInput
                fullWidth
                suggestions={["Aprenda", "JavaScript"]}
                value={formik.values.question.tags}
                id="tags"
                onChange={formik.handleChange}
              />
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
        <TypeOfQuestion handleClose={handleCloseModalTypeQuestion} />
      </Modal>
    </>
  );
};

export default Question;

import React, { useState } from "react";
import { useFormik } from "formik";


import {
  Grid,
  Typography,
  TextField,
  Toolbar,
  Box,
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
  GridRegisterQuestion,
  StyledAppBar,
  CardSelectQuestion
} from "./style";

//HOOKS
import useQuestionQuiz from "@hooks/QuestionQuiz";

// COMPONENTS
import Modal from "@components/Modal";
import StyledButton from "@components/Button";
import CheckBox from './components/checkbox'
import SelectInput from './components/select'
import TagInput from "./components/tagInput";

// PAGES
import TypeOfQuestion from "../TypeOfQuestion";

const Question = () => {
  const { questions, updateQuestion, updateAnswer, removeQuestion, saveQuestionOnDatabase } = useQuestionQuiz();

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
    setQuestionOnScreen({ index, question });
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
                onClick={saveQuestionOnDatabase}
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
                  <CardSelectQuestion
                    isonscreen={(index === questionOnScreen.index) ? "true" : "false"}
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={handleChangeQuestion(item, index)}
                  >
                    {item.title}
                  </CardSelectQuestion>
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
          {!!questions.length ?  <>
              <Grid item xs={12}>
                <StyledTitleInput
                  placeholder="DIGITE O ENUNCIADO AQUI"
                  formikID="question.title"
                  handleFormikChange={formik.handleChange}
                  value={formik.values.question.title}
                  handlePropsChange={{
                    handleUpdate: updateQuestion,
                    key: "title",
                    index: formik.values.index
                  }}
                  required
                  autoFocus
                />
              </Grid>
                  
              <img src={formik.values.question.image} />

              <Grid item>
                <TextField
                  type="file"
                  name="Imagem de Capa"
                  id="question.image"
                  onChange={event => {
                    formik.setFieldValue("question.image", URL.createObjectURL(event.target.files[0]))
                    console.log("file:", URL.createObjectURL(event.target.files[0]))
                  }}
                />
              </Grid>
  
              <Grid container align="center" justify="center" spacing={2}>
                {formik.values.question.answer.map((item, index) => (
                  <Grid item xs={12} md={6} key={index} style={{display: "flex", height: "80px", alignItems: "center"}}>
                    <CheckBox
                      style={{width: "50px", height: "50px"}}
                      inputProps={{ "aria-label": "primary checkbox" }}
                      checked={Boolean(item.is_correct)}
                      formikID={`question.answer[${index}].is_correct`}
                      handleFormikChange={formik.handleChange}
                      handlePropsChange={{
                        handleUpdate: updateAnswer,
                        key: "is_correct",
                        indexQuestion: formik.values.index,
                        indexAnswer: index
                      }}
                    />
                    <StyledAnswerInput
                      type="text"
                      placeholder={`DIGITE A ALTERNATIVA ${index + 1}`}
                      formikID={`question.answer[${index}].title`}
                      value={item.title}
                      handleFormikChange={formik.handleChange}
                      handlePropsChange={{
                        handleUpdate: updateAnswer,
                        key:"title",
                        indexQuestion: formik.values.index,
                        indexAnswer: index
                      }}
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
                  onClick={() => {
                    removeQuestion(formik.values.index)

                    let newIndex = formik.values.index;
                    if(newIndex === questions.length-1) newIndex = questions.length-2

                    handleChangeQuestion(questions[newIndex], newIndex)()
                  }}
                >
                  Excluir Questão
                </StyledButton>
              </GridRegisterQuestion>
              </> 
              :  <p>Vazio!</p>}
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
            
            {!!questions.length ?  <>
              <Grid item style={{ marginBottom: "20px" }}>
              <SelectInput
                fullWidth
                label="Tempo"
                name="time"
                variant="outlined"
                formikID="question.timer"
                value={formik.values.question.timer}
                handleFormikChange={formik.handleChange}
                handlePropsChange={{
                  handleUpdate: updateQuestion,
                  key: "timer",
                  index: formik.values.index
                }}
                required
              >
                <option value={92}>92 segundos</option>
                <option value={30}>30 segundos</option>
              </SelectInput>
            </Grid>


            <Grid item style={{ marginBottom: "20px" }}>
              <TagInput
                fullWidth
                suggestions={["Aprenda", "JavaScript"]}
                value={formik.values.question.tags}
                formikID="question.tags"
                handleFormikChange={formik.setFieldValue}
                handlePropsChange={{
                  handleUpdate: updateQuestion,
                  key: "tags",
                  index: formik.values.index
                }}
              />
            </Grid>
            </> : <p>Vazio!</p>}
            
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
        <TypeOfQuestion updateScreen={handleChangeQuestion} handleClose={handleCloseModalTypeQuestion} />
      </Modal>
    </>
  );
};

export default Question;

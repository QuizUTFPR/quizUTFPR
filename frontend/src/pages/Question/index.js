import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Save,
  CheckCircle,
  AddCircle,
  Delete,
  Done,
  Warning,
  FileCopy,
} from '@material-ui/icons/';

// ROUTES
import { QUIZ } from '@routes';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

// COMPONENTS
import { Grid, Typography, Toolbar, FormControlLabel } from '@material-ui/core';
import Modal from '@components/Modal';
import StyledButton from '@components/Button';
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
  CardSelectQuestion,
  PreviewImage,
  GridItemStyledRight,
  GridQuestions,
  StyledMessage,
  BoxStyledAction,
  WrapperMessage,
  CopiedQuestionMessage,
  StyledExitIcon,
} from './style';

import CheckBox from './components/checkbox';
import SelectInput from './components/select';
import TagInput from './components/tagInput';
import DragImageInput from './components/dragImage';
import AlertRemoveMessage from './components/confirmRemove';
import AlertFinish from './components/confirmFinish';

// PAGES
import TypeOfQuestion from '../TypeOfQuestion';

const Question = () => {
  const {
    questions,
    getAllQuestionOfTheQuiz,
    updateQuestion,
    updateAnswer,
    removeQuestion,
    saveQuestionOnDatabase,
    isSaved,
  } = useQuestionQuiz();

  const [isModalTypeOfQuestionOpen, setModalTypeOfQuestionOpen] =
    useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  const handleOpenModalTypeQuestion = () => setModalTypeOfQuestionOpen(true);
  const handleCloseModalTypeQuestion = () => setModalTypeOfQuestionOpen(false);

  const [openFinishAlert, setOpenFinishAlert] = useState(false);

  const handleOpenFinishAlert = () => setOpenFinishAlert(true);
  const handleCloseFinishAlert = () => setOpenFinishAlert(false);

  // eslint-disable-next-line camelcase
  const { id_quiz } = useParams();
  useEffect(() => {
    // eslint-disable-next-line camelcase
    getAllQuestionOfTheQuiz(id_quiz);
  }, []);

  const [questionOnScreen, setQuestionOnScreen] = useState({
    index: 0,
    question: questions[0],
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: questionOnScreen,
  });

  const handleChangeQuestion = (oldQuestion, index) => () => {
    if (index < 0) return;

    const question = {
      ...oldQuestion,
      image:
        oldQuestion.image === null
          ? null
          : URL.createObjectURL(oldQuestion.image),
    };

    setQuestionOnScreen({ index, question });
  };

  const handleRemoveQuestion = () => {
    removeQuestion(formik.values.index);

    const indexOfQuestionOnScreen = formik.values.index;
    const indexOfTheLastQuestionOnContext = questions.length - 1;
    const newIndex =
      indexOfQuestionOnScreen === indexOfTheLastQuestionOnContext
        ? indexOfTheLastQuestionOnContext - 1
        : indexOfQuestionOnScreen;

    handleChangeQuestion(questions[newIndex], newIndex)();
  };

  const handleFinish = () => {
    console.log('finalizou');
  };

  return (
    <>
      <StyledAppBar position="static" color="transparent">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <StyledButton
                component={Link}
                to={QUIZ}
                color="secondary"
                variant="outlined"
                startIcon={<StyledExitIcon />}
                size="large"
              >
                Sair
              </StyledButton>
            </Grid>

            <Grid item>
              <Typography component="h4" variant="h4" color="primary">
                Título do Quiz
              </Typography>
            </Grid>

            <BoxStyledAction>
              {isSaved ? (
                <WrapperMessage>
                  <Done />
                  <StyledMessage>Salvo</StyledMessage>
                </WrapperMessage>
              ) : (
                <WrapperMessage>
                  <Warning />
                  <StyledMessage>Não Salvo</StyledMessage>
                </WrapperMessage>
              )}

              <StyledButton
                style={{ marginRight: '20px' }}
                color="primary"
                variant="outlined"
                onClick={saveQuestionOnDatabase}
                startIcon={<Save />}
                size="large"
                disabled={isSaved}
              >
                Salvar
              </StyledButton>
              <StyledButton
                color="primary"
                variant="contained"
                onClick={handleOpenFinishAlert}
                startIcon={<CheckCircle />}
                size="large"
              >
                Finalizar
              </StyledButton>
            </BoxStyledAction>
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

            <GridQuestions container>
              {questions.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid item xs={12} key={index}>
                  <CardSelectQuestion
                    isonscreen={
                      index === questionOnScreen.index ? 'true' : 'false'
                    }
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={handleChangeQuestion(item, index)}
                  >
                    {item.title ? item.title : 'Sem Título'}
                  </CardSelectQuestion>
                </Grid>
              ))}
            </GridQuestions>

            <GridButtonNewQuestion item xs={12}>
              <StyledButton
                onClick={handleOpenModalTypeQuestion}
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<AddCircle />}
                size="large"
              >
                CRIAR NOVA QUESTÃO
              </StyledButton>
            </GridButtonNewQuestion>
          </StyledLeftGrid>
        </Grid>

        {/* MIDDLE */}
        <Grid item xs={7}>
          <StyledGrid container justify="center" align="center">
            {questions.length ? (
              <>
                {formik.values.question.copy && (
                  <CopiedQuestionMessage item xs={12}>
                    <FileCopy />
                    <span>
                      Esta questão é uma copia retirada do banco de questões.
                    </span>
                  </CopiedQuestionMessage>
                )}
                <Grid item xs={12}>
                  <StyledTitleInput
                    placeholder="DIGITE O ENUNCIADO AQUI"
                    formikID="question.title"
                    handleFormikChange={formik.handleChange}
                    value={formik.values.question.title}
                    handlePropsChange={{
                      handleUpdate: updateQuestion,
                      key: 'title',
                      index: formik.values.index,
                    }}
                    required
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  ̣ <PreviewImage src={formik.values.question.image} />
                </Grid>

                <Grid item xs={12}>
                  <DragImageInput
                    formikID="question.image"
                    name="Imagem de Capa"
                    handleFormikChange={formik.setFieldValue}
                    handlePropsChange={{
                      handleUpdate: updateQuestion,
                      key: 'image',
                      index: formik.values.index,
                    }}
                  />
                </Grid>

                <Grid container align="center" justify="center" spacing={2}>
                  {formik.values.question.answer.map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      style={{
                        display: 'flex',
                        height: '80px',
                        alignItems: 'center',
                      }}
                    >
                      <CheckBox
                        style={{ width: '50px', height: '50px' }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        checked={Boolean(item.is_correct)}
                        formikID={`question.answer[${index}].is_correct`}
                        handleFormikChange={formik.handleChange}
                        handlePropsChange={{
                          handleUpdate: updateAnswer,
                          key: 'is_correct',
                          indexQuestion: formik.values.index,
                          indexAnswer: index,
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
                          key: 'title',
                          indexQuestion: formik.values.index,
                          indexAnswer: index,
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
                    onClick={handleClickOpenAlert}
                    startIcon={<Delete />}
                    size="large"
                  >
                    Excluir Questão
                  </StyledButton>
                </GridRegisterQuestion>
              </>
            ) : (
              <p>Vazio!</p>
            )}
          </StyledGrid>
        </Grid>

        {/* RIGHT */}

        <Grid item xs={3}>
          <StyledRightGrid container align="center" direction="column">
            <Grid item style={{ marginBottom: '40px' }}>
              <Typography color="primary" component="h5" variant="h5">
                Detalhes da Questão
              </Typography>
            </Grid>

            {questions.length ? (
              <>
                <GridItemStyledRight item>
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
                      key: 'timer',
                      index: formik.values.index,
                    }}
                    required
                  >
                    <option value={92}>92 segundos</option>
                    <option value={30}>30 segundos</option>
                  </SelectInput>
                </GridItemStyledRight>

                <GridItemStyledRight item>
                  <TagInput
                    fullWidth
                    suggestions={['Aprenda', 'JavaScript']}
                    value={formik.values.question.tags}
                    formikID="question.tags"
                    handleFormikChange={formik.setFieldValue}
                    handlePropsChange={{
                      handleUpdate: updateQuestion,
                      key: 'tags',
                      index: formik.values.index,
                    }}
                  />
                </GridItemStyledRight>

                <GridItemStyledRight item style={{ alignSelf: 'start' }}>
                  <FormControlLabel
                    control={
                      <CheckBox
                        disabled={Boolean(formik.values.question.copy)}
                        style={{ width: '50px', height: '50px' }}
                        inputProps={{
                          'aria-label': 'primary checkbox',
                          label: 'teste',
                        }}
                        checked={formik.values.question.availableOnQuestionsDB}
                        formikID="question.availableOnQuestionsDB"
                        handleFormikChange={formik.handleChange}
                        handlePropsChange={{
                          handleUpdate: updateQuestion,
                          key: 'availableOnQuestionsDB',
                          index: formik.values.index,
                        }}
                      />
                    }
                    label="Disponivel no Banco de Questão"
                  />
                </GridItemStyledRight>
              </>
            ) : (
              <p>Vazio!</p>
            )}
          </StyledRightGrid>
        </Grid>
      </ContainerGrid>

      {/* MODALS */}
      <Modal
        open={isModalTypeOfQuestionOpen}
        modalTitle="Qual tipo de questão deseja criar?"
        modalDescription="Escolha o tipo da questão..."
        style={{ overflow: 'scroll' }}
      >
        <TypeOfQuestion
          updateScreen={handleChangeQuestion}
          handleClose={handleCloseModalTypeQuestion}
        />
      </Modal>

      <Modal open={openAlert} onClose={handleCloseAlert}>
        <AlertRemoveMessage
          handleClose={handleCloseAlert}
          onClick={handleRemoveQuestion}
        />
      </Modal>

      <Modal open={openFinishAlert} onClose={handleCloseFinishAlert}>
        <AlertFinish
          handleClose={handleCloseFinishAlert}
          onClick={handleFinish}
        />
      </Modal>
    </>
  );
};

export default Question;

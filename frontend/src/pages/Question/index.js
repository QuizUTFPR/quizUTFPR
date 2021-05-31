import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';

// ROUTES
import { QUIZ } from '@routes';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

// COMPONENTS
import Modal from '@components/Modal';
import AlertRemoveMessage from '@components/ConfirmRemove';
import { ContainerGrid } from './style';
import Header from './components/header';
import LeftSide from './components/leftSide';
import MiddleSide from './components/middleSide';
import RightSide from './components/rightSide';
import AlertGetOut from './components/confirmGetOut';

// PAGES
import TypeOfQuestion from '../TypeOfQuestion';

const Question = ({ history, location }) => {
  // eslint-disable-next-line camelcase
  const { id_quiz } = useParams();
  const {
    questions,
    getAllQuestionOfTheQuiz,
    updateQuestion,
    updateAnswer,
    removeQuestion,
    saveQuestionOnDatabase,
    validationSchemeArrayQuestion,
    validationSchemeQuestion,
    isSaved,
    isTyping,
    errors,
    setErrors,
    initialValueErrors,
  } = useQuestionQuiz();
  const [openTypeOfQuestion, setOpenTypeOfQuestion] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openGetOutAlert, setOpenGetOutAlert] = useState(false);
  const [onScreen, setOnScreen] = useState({
    index: 0,
    question: questions[0],
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: onScreen,
  });

  const handleClickOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);
  const handleOpenModalTypeQuestion = () => setOpenTypeOfQuestion(true);
  const handleCloseModalTypeQuestion = () => setOpenTypeOfQuestion(false);
  const handleOpenGetOutAlert = () => setOpenGetOutAlert(true);
  const handleCloseGetOutAlert = () => setOpenGetOutAlert(false);

  const fetchQuestions = async () => {
    // eslint-disable-next-line camelcase
    const firstQuestion = await getAllQuestionOfTheQuiz(id_quiz);
    setOnScreen({ index: 0, question: firstQuestion });
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChangeQuestion = (question, index) => () => {
    if (index < 0) return;

    setOnScreen({
      index,
      question,
    });
    setErrors(initialValueErrors);
  };

  const handleRemoveQuestion = async () => {
    const question = removeQuestion(formik.values.index);

    const indexOfQuestionOnScreen = formik.values.index;
    const indexOfTheLastQuestionOnContext = questions.length - 1;
    const newIndex =
      indexOfQuestionOnScreen === indexOfTheLastQuestionOnContext
        ? indexOfTheLastQuestionOnContext - 1
        : indexOfQuestionOnScreen;

    handleChangeQuestion(question[newIndex], newIndex)();
  };

  const handleGetOut = () => {
    if (isSaved) history.push(QUIZ);
    else handleOpenGetOutAlert();
  };
  const handleSave = async () => {
    // VERIFICO SE AS QUESTÃO ESTÃO VALIDAS
    if (await validationSchemeArrayQuestion.isValid(questions)) {
      saveQuestionOnDatabase(id_quiz);
      return;
    }

    // PROCURO QUAL QUESTÃO É INVALIDA E QUAIS SEUS ERROS
    questions.forEach(async (question, index) => {
      await validationSchemeQuestion
        .validate(question, { abortEarly: false })
        .catch((error) => {
          let newErrors = {};
          // eslint-disable-next-line prefer-const

          error.inner.forEach(({ path }) => {
            // eslint-disable-next-line prefer-const
            let key = path;
            if (key.includes('answer')) key = 'answer';

            newErrors = { ...newErrors, [key]: true };
          });

          handleChangeQuestion(question, index)();
          setErrors((prevState) => ({
            ...prevState,
            ...newErrors,
          }));
        });
    });
  };

  return (
    <>
      <Header
        handleGetOut={handleGetOut}
        location={location}
        handleSave={handleSave}
        isSaved={isSaved}
        isTyping={isTyping}
      />

      <ContainerGrid container>
        {/* LEFT */}
        <LeftSide
          questions={questions}
          questionOnScreen={onScreen}
          handleOpenModalTypeQuestion={handleOpenModalTypeQuestion}
          handleChangeQuestion={handleChangeQuestion}
        />

        {/* MIDDLE */}
        <MiddleSide
          errors={errors}
          questions={questions}
          formik={formik}
          updateQuestion={updateQuestion}
          updateAnswer={updateAnswer}
          handleClickOpenAlert={handleClickOpenAlert}
        />

        {/* RIGHT */}
        <RightSide
          formik={formik}
          updateQuestion={updateQuestion}
          questions={questions}
        />
      </ContainerGrid>

      {/* MODALS */}
      <Modal
        open={openTypeOfQuestion}
        modalTitle="Qual tipo de questão deseja criar?"
        modalDescription="Escolha o tipo da questão..."
        style={{ overflow: 'scroll' }}
        handleClose={handleCloseModalTypeQuestion}
      >
        <TypeOfQuestion
          updateScreen={handleChangeQuestion}
          handleClose={handleCloseModalTypeQuestion}
        />
      </Modal>

      <Modal open={openAlert} handleClose={handleCloseAlert}>
        <AlertRemoveMessage
          handleClose={handleCloseAlert}
          onClick={handleRemoveQuestion}
          title="Deseja mesmo excluir a questão?"
          description="A questão será excluida do modo de edição, porém, somente sera
          persistida a exclusão pressionar o botão de salvar alterações."
        />
      </Modal>

      <Modal open={openGetOutAlert} handleClose={handleCloseGetOutAlert}>
        <AlertGetOut handleClose={handleCloseGetOutAlert} />
      </Modal>
    </>
  );
};

export default Question;

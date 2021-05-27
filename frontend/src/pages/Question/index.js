import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';

// ROUTES
import { QUIZ } from '@routes';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

// COMPONENTS
import Modal from '@components/Modal';
import { ContainerGrid } from './style';
import Header from './components/header';
import LeftSide from './components/leftSide';
import MiddleSide from './components/middleSide';
import RightSide from './components/rightSide';
import AlertRemoveMessage from './components/confirmRemove';
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
    isSaved,
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

  useEffect(() => {
    const fetch = async () => {
      // eslint-disable-next-line camelcase
      const firstQuestion = await getAllQuestionOfTheQuiz(id_quiz);
      setOnScreen({ index: 0, question: firstQuestion });
    };

    fetch();
  }, []);

  const handleChangeQuestion = (oldQuestion, index) => () => {
    if (index < 0) return;

    const question = {
      ...oldQuestion,
      image:
        oldQuestion.image === null
          ? null
          : URL.createObjectURL(oldQuestion.image),
    };

    setOnScreen({ index, question });
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

  const handleGetOut = () => {
    if (isSaved) history.push(QUIZ);
    else handleOpenGetOutAlert();
  };

  return (
    <>
      <Header
        handleGetOut={handleGetOut}
        location={location}
        saveQuestionOnDatabase={saveQuestionOnDatabase}
        isSaved={isSaved}
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
        />
      </Modal>

      <Modal open={openGetOutAlert} handleClose={handleCloseGetOutAlert}>
        <AlertGetOut handleClose={handleCloseGetOutAlert} />
      </Modal>
    </>
  );
};

export default Question;

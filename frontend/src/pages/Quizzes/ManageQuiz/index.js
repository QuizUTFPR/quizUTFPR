import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

// ROUTES
import { QUIZ } from '@routes';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

// COMPONENTS

import Modal from '@components/Modal';
import AlertRemoveMessage from '@components/ConfirmRemove';
import AnimatedContainer from '@components/WrapperAnimatedPage';
import { ContainerGrid } from './style';
import Header from './components/header';
import LeftSide from './components/leftSide';
import MiddleSide from './components/middleSide';
import RightSide from './components/rightSide';
import AlertGetOut from './components/confirmGetOut';
import ChangeQuestion from './components/confirmChangeTypeQuestion';
import DragImageContainer from './components/dragImageContainer';
// PAGES
import TypeOfQuestion from './ModalTypeOfQuestion';

const Question = () => {
  const navigate = useNavigate();

  const { idQuiz } = useParams();
  const {
    questions,
    getAllQuestionOfTheQuiz,
    updateQuestion,
    updateAnswer,
    removeQuestion,
    saveQuestionOnDatabase,
    changeTypeQuestion,
    validationSchemeArrayQuestion,
    validationSchemeQuestion,
    isSaved,
    isTyping,
    errors,
    setErrors,
    initialValueErrors,
    questionToDown,
    questionToUp,
    OptionsOfTime,
    optionsOfDifficultyLevel,
    setQuestions,
    initialValue,
    setSaved,
    setTyping,
    setQuestionToRemove,
    setQuizInfo,
    quizInfo,
  } = useQuestionQuiz();

  const [openChangeTypeQuestionModal, setTypeQuestionModal] = useState({
    open: false,
    indexQuestion: null,
    type: null,
  });
  const [openTypeOfQuestion, setOpenTypeOfQuestion] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openGetOutAlert, setOpenGetOutAlert] = useState(false);
  const [openDragImage, setOpenDragImage] = useState(false);
  const [isModalQuestionDatabaseOpen, setModalQuestionDatabaseOpen] =
    useState(false);
  const [isModalSheetQuestionOpen, setModalSheetQuestion] = useState(false);

  const [onScreen, setOnScreen] = useState({
    index: 0,
    question: questions[0],
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: onScreen,
  });

  const handleOpenChangeTypeQuestion = (state) => setTypeQuestionModal(state);
  const handleCloseChangeTypeQuestion = () =>
    setTypeQuestionModal({
      open: false,
      indexQuestion: null,
      type: null,
    });

  // CONTROLE DE MODALS
  const handleOpenDragImage = () => setOpenDragImage(true);
  const handleCloseDragImage = () => setOpenDragImage(false);

  const handleClickOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  const handleOpenModalTypeQuestion = () => setOpenTypeOfQuestion(true);
  const handleCloseModalTypeQuestion = () => setOpenTypeOfQuestion(false);
  const toogleModalQuestionDB = () =>
    setModalQuestionDatabaseOpen((prevState) => !prevState);

  const toogleModalSheetQuestionOpen = () =>
    setModalSheetQuestion((prevState) => !prevState);

  const handleOpenGetOutAlert = () => setOpenGetOutAlert(true);
  const handleCloseGetOutAlert = () => setOpenGetOutAlert(false);

  const fetchQuestions = async () => {
    const firstQuestion = await getAllQuestionOfTheQuiz(idQuiz);
    setOnScreen({ index: 0, question: firstQuestion });
  };

  useEffect(() => {
    fetchQuestions();

    return () => {
      setQuestions(JSON.parse(JSON.stringify(initialValue)));
      setSaved(true);
      setTyping(false);
      setErrors(JSON.parse(JSON.stringify(initialValueErrors)));
      setQuestionToRemove([]);
      setOnScreen({
        index: 0,
        question: JSON.parse(JSON.stringify(initialValue)),
      });
      setQuizInfo(false);
    };
  }, []);

  const handleChangeQuestion = (question, index) => () => {
    if (index < 0) return;

    setOnScreen({
      index,
      question,
    });
    setErrors(JSON.parse(JSON.stringify(initialValueErrors)));
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
    if (isSaved) navigate(QUIZ);
    else handleOpenGetOutAlert();
  };

  const handleSave = async () => {
    // VERIFICO SE AS QUESTÃO ESTÃO VALIDAS
    if (await validationSchemeArrayQuestion.isValid(questions)) {
      saveQuestionOnDatabase(idQuiz);
      return true;
    }
    // PROCURO QUAL QUESTÃO É INVALIDA E QUAIS SEUS ERROS
    questions.forEach(async (question, index) => {
      await validationSchemeQuestion
        .validate(question, {
          abortEarly: false,
        })
        .catch((error) => {
          let newErrors = {};
          // eslint-disable-next-line prefer-const
          error.inner.forEach(({ path }) => {
            // eslint-disable-next-line prefer-const
            let key = path;
            if (key.includes('answer')) key = 'answer';

            newErrors = {
              ...newErrors,
              [key]: true,
            };
          });

          handleChangeQuestion(question, index)();
          setErrors((prevState) => ({
            ...prevState,
            ...newErrors,
          }));
        });
    });
    return false;
  };

  const handleFinish = () => {
    if (!isSaved) {
      handleSave().then((saved) => {
        if (saved) {
          navigate(QUIZ);
        }
      });
    } else {
      navigate(QUIZ);
    }
  };

  return (
    <AnimatedContainer>
      <Header
        handleGetOut={handleGetOut}
        quizInfo={quizInfo}
        handleSave={handleSave}
        isSaved={isSaved}
        isTyping={isTyping}
        handleFinish={handleFinish}
      />
      <ContainerGrid container>
        {/* LEFT */}
        <LeftSide
          quizInfo={quizInfo}
          questions={questions}
          questionOnScreen={onScreen}
          handleOpenModalTypeQuestion={handleOpenModalTypeQuestion}
          handleChangeQuestion={handleChangeQuestion}
          handleToUp={questionToUp}
          handleToDown={questionToDown}
        />

        {/* MIDDLE */}
        <MiddleSide
          quizInfo={quizInfo}
          errors={errors}
          questions={questions}
          formik={formik}
          updateQuestion={updateQuestion}
          updateAnswer={updateAnswer}
          handleClickOpenAlert={handleClickOpenAlert}
          handleOpenDragImage={handleOpenDragImage}
        />

        {/* RIGHT */}
        <RightSide
          quizInfo={quizInfo}
          formik={formik}
          errors={errors}
          updateQuestion={updateQuestion}
          questions={questions}
          handleOpenChangeTypeQuestion={handleOpenChangeTypeQuestion}
          optionsOfTime={OptionsOfTime}
          optionsOfDifficultyLevel={optionsOfDifficultyLevel}
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
          toogleModalQuestionDB={toogleModalQuestionDB}
          isModalQuestionDatabaseOpen={isModalQuestionDatabaseOpen}
          isModalSheetQuestionOpen={isModalSheetQuestionOpen}
          toogleModalSheetQuestionOpen={toogleModalSheetQuestionOpen}
        />
      </Modal>

      <Modal open={openAlert} handleClose={handleCloseAlert}>
        <AlertRemoveMessage
          width="35vw"
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

      <Modal
        open={openChangeTypeQuestionModal.open}
        handleClose={handleCloseChangeTypeQuestion}
      >
        <ChangeQuestion
          modalState={openChangeTypeQuestionModal}
          handleClose={handleCloseChangeTypeQuestion}
          handleChange={changeTypeQuestion}
        />
      </Modal>

      <Modal open={openDragImage} handleClose={handleCloseDragImage}>
        <DragImageContainer
          updateQuestion={updateQuestion}
          formik={formik}
          handleClose={handleCloseDragImage}
        />
      </Modal>
    </AnimatedContainer>
  );
};

export default Question;

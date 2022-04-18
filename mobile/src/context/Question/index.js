import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// API
import api from '@api';

export const QuestionContext = createContext();

const Question = ({ children }) => {
  const initialValue = {
    questions: [],
    indexOnScreen: 0,
  };

  const initialRequestQuestion = {
    checkedAnswer: [false, false, false, false],
  };

  const [noTime, setNoTime] = useState(false);
  const [quizData, setQuizData] = useState(initialValue); // save the quiz data about the question on screen
  const [quizID, setQuizID] = useState(-1);
  const [amountOfQuestion, setAmountOfQuestion] = useState(0);
  const [amountAlreadyAnswered, setAlreadyAnswered] = useState(0);
  const [StudentQuizID, setStudentQuizID] = useState(-1);
  const [requestQuestion, setRequestQuestion] = useState(
    initialRequestQuestion
  );
  const [quizInfo, setQuizInfo] = useState(null); // save only the quiz info

  const handleFinishQuizAnswering = async () => {
    const { data } = await api.put('/studentQuiz/finishQuiz', {
      idStudentQuiz: StudentQuizID,
      quizId: quizID,
    });

    return data;
  };

  const handleSaveRequestQuestionOnDatabase = async (timeLeft) => {
    const requestData = {
      timeLeft,
      studentQuizId: StudentQuizID,
      quizId: quizID,
      questionId: quizData.questions[quizData.indexOnScreen].id,
      arrayOfChecked: requestQuestion.checkedAnswer,
    };

    await api.post('/studentQuiz/createChoice', {
      ...requestData,
    });

    setRequestQuestion(initialRequestQuestion);
  };

  // eslint-disable-next-line camelcase
  const getQuestionsOfQuizFromDatabase = async (quizId, idStudentQuiz) => {
    const { data } = await api.post('/studentQuiz/getQuestionQuiz', {
      quizId,
      idStudentQuiz,
    });

    setAlreadyAnswered(data.amountStudentChoice);
    setQuizID(quizId);
    setStudentQuizID(idStudentQuiz);
    setAmountOfQuestion(data.amountOfQuestion);
    setQuizData({
      indexOnScreen: 0,
      questions: data.questions,
    });
  };

  const changeToNextQuestion = async () => {
    if (quizData.indexOnScreen === quizData.questions.length - 1) {
      return handleFinishQuizAnswering();
    }
    setQuizData((prevState) => ({
      ...prevState,
      indexOnScreen: prevState.indexOnScreen + 1,
    }));

    setAlreadyAnswered((prevState) => prevState + 1);
    return false;
  };

  const handleSetCheckedAnswer = (index) => {
    setRequestQuestion((prevState) => {
      const newCheckedAnswer = prevState.checkedAnswer;
      newCheckedAnswer[index] = !newCheckedAnswer[index];

      return {
        ...prevState,
        checkedAnswer: newCheckedAnswer,
      };
    });
  };

  return (
    <QuestionContext.Provider
      value={{
        quizData,
        setQuizData,
        getQuestionsOfQuizFromDatabase,
        changeToNextQuestion,
        requestQuestion,
        handleSetCheckedAnswer,
        handleSaveRequestQuestionOnDatabase,
        initialRequestQuestion,
        StudentQuizID,
        amountOfQuestion,
        amountAlreadyAnswered,
        noTime,
        setNoTime,
        setQuizInfo,
        quizInfo,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

Question.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Question;

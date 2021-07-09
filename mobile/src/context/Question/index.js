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

  const [quizData, setQuizData] = useState(initialValue);
  const [quizID, setQuizID] = useState(-1);
  const [amountOfQuestion, setAmountOfQuestion] = useState(0);
  const [amountAlreadyAnswered, setAlreadyAnswered] = useState(0);
  const [StudentQuizID, setStudentQuizID] = useState(-1);
  const [requestQuestion, setRequestQuestion] = useState(
    initialRequestQuestion
  );

  const handleFinishQuizAnswering = async () => {
    const { data } = await api.put('/studentQuiz/finishQuiz', {
      id_student_quiz: StudentQuizID,
      quiz_id: quizID,
    });

    console.log('salvou score no banco');
    return data;
  };

  const handleSaveRequestQuestionOnDatabase = async (timeLeft) => {
    const requestData = {
      time_left: timeLeft,
      student_quiz_id: StudentQuizID,
      quiz_id: quizID,
      question_id: quizData.questions[quizData.indexOnScreen].id,
      arrayOfChecked: requestQuestion.checkedAnswer,
    };

    await api.post('/studentQuiz/createChoice', {
      ...requestData,
    });

    console.log('respondeu no banco');

    setRequestQuestion(initialRequestQuestion);
  };

  // eslint-disable-next-line camelcase
  const getQuestionsOfQuizFromDatabase = async (quiz_id, id_student_quiz) => {
    const { data } = await api.post('/studentQuiz/getQuestionQuiz', {
      quiz_id,
      id_student_quiz,
    });
    setAlreadyAnswered(data.amountStudentChoice);
    setQuizID(quiz_id);
    setStudentQuizID(id_student_quiz);
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

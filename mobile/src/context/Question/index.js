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
  const [StudentQuizID, setStudentQuizID] = useState(-1);
  const [requestQuestion, setRequestQuestion] = useState(
    initialRequestQuestion
  );

  const handleFinishQuizAnswering = async () => {
    const { data } = await api.put('/studentQuiz/finishQuiz', {
      id_student_quiz: StudentQuizID,
      quiz_id: quizID,
    });
    console.log(data);
  };

  const handleSaveRequestQuestionOnDatabase = async (timeLeft) => {
    const requestData = {
      time_left: timeLeft,
      student_quiz_id: StudentQuizID,
      quiz_id: quizID,
      question_id: quizData.questions[quizData.indexOnScreen].id,
      arrayOfChecked: requestQuestion.checkedAnswer,
    };

    const { data } = await api.post('/studentQuiz/createChoice', {
      ...requestData,
    });

    console.log(data);

    setRequestQuestion(initialRequestQuestion);
  };

  // eslint-disable-next-line camelcase
  const getQuestionsOfQuizFromDatabase = async (quiz_id, id_student_quiz) => {
    const { data } = await api.post('/studentQuiz/getQuestionQuiz', {
      quiz_id,
      id_student_quiz,
    });

    setQuizID(quiz_id);
    setStudentQuizID(id_student_quiz);
    setQuizData((prevState) => ({
      ...prevState,
      questions: data,
    }));
  };

  const changeToNextQuestion = async () => {
    if (quizData.indexOnScreen === quizData.questions.length - 1) {
      await handleFinishQuizAnswering();
    } else {
      setQuizData((prevState) => ({
        ...prevState,
        indexOnScreen: prevState.indexOnScreen + 1,
      }));
    }
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

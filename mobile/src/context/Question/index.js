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
    idQuiz: -1,
    idQuestion: -1,
    checkedAnswer: [false, false, false, false],
  };

  const [quizData, setQuizData] = useState(initialValue);
  const [StudentQuizID, setStudentQuizID] = useState(-1);
  const [requestQuestion, setRequestQuestion] = useState(
    initialRequestQuestion
  );

  // eslint-disable-next-line camelcase
  const getQuestionsOfQuizFromDatabase = async (quiz_id, id_student_quiz) => {
    const { data } = await api.post('/studentQuiz/getQuestionQuiz', {
      quiz_id,
      id_student_quiz,
    });
    setStudentQuizID(id_student_quiz);
    setQuizData((prevState) => ({
      ...prevState,
      questions: data,
    }));
  };

  const changeToNextQuestion = () => {
    if (quizData.indexOnScreen === quizData.questions.length - 1) {
      console.log('Chegou no limite!');
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

  const handleSaveRequestQuestionOnDatabase = () => {
    console.log('salvou');
    setRequestQuestion(initialRequestQuestion);
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

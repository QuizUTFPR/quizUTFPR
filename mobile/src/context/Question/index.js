import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Array } from '../../pages/Question/question.js';

export const QuestionContext = createContext();

export const initialValue = {
  questions: Array,
  indexOnScreen: 0,
};

export const initialRequestQuestion = {
  idQuiz: 0,
  idQuestion: 0,
  checkedAnswer: [false, false, false, false],
};

const Question = ({ children }) => {
  const [quizData, setQuizData] = useState(initialValue);
  const [requestQuestion, setRequestQuestion] = useState(
    initialRequestQuestion
  );

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
    console.log('teste', requestQuestion);
    setRequestQuestion(initialRequestQuestion);
  };

  return (
    <QuestionContext.Provider
      value={{
        quizData,
        setQuizData,
        requestQuestion,
        handleSetCheckedAnswer,
        handleSaveRequestQuestionOnDatabase,
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

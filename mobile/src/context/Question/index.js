import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const QuestionContext = createContext();

export const initialValue = {
  questions: null,
  indexOnScreen: null,
};

export const initialRequestQuestion = {
  idQuiz: 0,
  idQuestion: 0,
  checkedAnswer: [false, false, false, false],
};

const Question = ({ children }) => {
  const [questions, setQuestions] = useState(initialValue);
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
    console.log(requestQuestion);
    setRequestQuestion(initialRequestQuestion);
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
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

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const QuestionContext = createContext();

export const initialValue = {
  questions: null,
  indexOnScreen: null,
};

const Question = ({ children }) => {
  const [questions, setQuestions] = useState(initialValue);

  return (
    <QuestionContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};

Question.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Question;

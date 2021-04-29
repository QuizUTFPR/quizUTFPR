import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const QuestionQuizContext = createContext();

const QuestionQuiz = ({ children }) => {
  const [questions, setQuestions] = useState('funcionando!');


  return (
    <QuestionQuizContext.Provider value={{ questions, setQuestions}}>
      {children}
    </QuestionQuizContext.Provider>
  );
};

QuestionQuiz.propTypes = {
  children: PropTypes.node.isRequired,
};

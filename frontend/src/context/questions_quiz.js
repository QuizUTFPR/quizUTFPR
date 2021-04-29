import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const QuestionQuizContext = createContext();

const QuestionQuiz = ({ children }) => {
  const [questions, setQuestions] = useState([]);


  const addQuestion = (item) => {
    setQuestions(prevState => [
      ...prevState,
      item
    ]
    )
  }

  const removeQuestion = (item) => {
    const newQuestions = questions.filter((element) => element != item)
    setQuestions(newQuestions);
  }

  return (
    <QuestionQuizContext.Provider value={{ questions, setQuestions, addQuestion, removeQuestion}}>
      {children}
    </QuestionQuizContext.Provider>
  );
};

QuestionQuiz.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuestionQuiz;
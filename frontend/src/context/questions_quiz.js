import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const QuestionQuizContext = createContext();

const QuestionQuiz = ({ children }) => {
  const [questions, setQuestions] = useState([{
    title: "Chabu é erro?",
    correctAnswer: true,
    timer: 15,
    difficultyLevel: 3,
    quiz_id: 2,
    answer: [
        {
            title: "Verdadeiro",
            is_correct: true
        },
        {
            title: "Mentira",
            is_correct: false
        }
    ],
    tags: [{name: "erro"}]
  }]);


  return (
    <QuestionQuizContext.Provider value={{ questions, setQuestions}}>
      {children}
    </QuestionQuizContext.Provider>
  );
};

QuestionQuiz.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuestionQuiz;
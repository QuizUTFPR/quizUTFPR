import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const QuestionQuizContext = createContext();

export const MockupQuestionTrueOrFalse = {
  title: "Título Questão",
  timer: 30,
  answer: [
    {
      title: "Verdadeiro",
      is_correct: false
    },
    {
      title: "Falso",
      is_correct: false
    }
  ],
  tags: []
}

export const MockupQuestionMultipleChoice = {
  title: "Título Questão",
  timer: 30,
  answer: [
    {
      title: "",
      is_correct: false
    },
    {
      title: "",
      is_correct: false
    },
    {
      title: "",
      is_correct: false
    },
    {
      title: "",
      is_correct: false
    }
  ],
  tags: []
}

export const initialValue = {
  title: "Questão 1",
  correctAnswer: true,
  timer: 30,
  answer: [
    {
      title: "",
      is_correct: false
    },
    {
      title: "",
      is_correct: false
    },
    {
      title: "",
      is_correct: true
    },
    {
      title: "",
      is_correct: false
    }
  ],
  tags: []
};

const QuestionQuiz = ({ children }) => {
  const [questions, setQuestions] = useState([initialValue]);

  const addQuestion = item => {
    setQuestions(prevState => [...prevState, item]);
  };

  const removeQuestion = item => {
    const newQuestions = questions.filter(element => element != item);
    setQuestions(newQuestions);
  };

  return (
    <QuestionQuizContext.Provider
      value={{ questions, setQuestions, addQuestion, removeQuestion, MockupQuestionTrueOrFalse, MockupQuestionMultipleChoice }}
    >
      {children}
    </QuestionQuizContext.Provider>
  );
};

QuestionQuiz.propTypes = {
  children: PropTypes.node.isRequired
};

export default QuestionQuiz;

import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const QuestionQuizContext = createContext();

export const MockupQuestionTrueOrFalse = {
  title: "",
  timer: 30,
  image: null,
  availableOnQuestionsDB: false,
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
};

export const MockupQuestionMultipleChoice = {
  title: "",
  timer: 30,
  image: null,
  availableOnQuestionsDB: false,
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
};

export const initialValue = [{
  title: "",
  correctAnswer: true,
  timer: 30,
  image: null,
  availableOnQuestionsDB: false,
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
}];



const QuestionQuiz = ({ children }) => {
  const [questions, setQuestions] = useState(initialValue);
  const [isSaved, setSaved] = useState(true);


  const saveQuestionOnDatabase = () => {
    setSaved(true);
    console.log("query" ,questions)
  }

  const addQuestion =  (item) => {
    setSaved(false);
    setQuestions(prevState => [...prevState, item]);
  };

  const removeQuestion = index => {
    setSaved(false);
    const newQuestions = questions.filter((element, i) =>  { if(i !== index)  return element; });
    setQuestions(newQuestions);
  };

  const updateQuestion = ({value, key, index}) => {
    setSaved(false);
    const newQuestions = questions.map((question, i) => {
      if (i === index) {
        return {
          ...question,
          [key]: value
        };
      }

      return question;
    });

    setQuestions(newQuestions);
  };

  const updateAnswer = ({value, key, indexQuestion, indexAnswer}) => {
    setSaved(false);
    const newQuestions = questions.map((question, i) => {
      if (i === indexQuestion) {
        return {
          ...question,
          answer: [
            ...question.answer.map((answer, index) => {
              if (index === indexAnswer) {
                return {
                  ...answer,
                  [key]: value
                };
              }

              return answer;
            })
          ]
        };
      }

      return question;
    });


    setQuestions(newQuestions);
  };

  return (
    <QuestionQuizContext.Provider
      value={{
        questions,
        isSaved,
        setQuestions,
        addQuestion,
        removeQuestion,
        MockupQuestionTrueOrFalse,
        MockupQuestionMultipleChoice,
        updateQuestion,
        updateAnswer,
        saveQuestionOnDatabase
      }}
    >
      {children}
    </QuestionQuizContext.Provider>
  );
};

QuestionQuiz.propTypes = {
  children: PropTypes.node.isRequired
};

export default QuestionQuiz;

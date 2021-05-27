import React, { createContext, useState } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import api from '@api';

export const QuestionQuizContext = createContext();

export const MockupQuestionTrueOrFalse = {
  copy: false,
  title: '',
  timer: 30,
  image: null,
  availableOnQuestionsDB: false,
  answer: [
    {
      title: 'Verdadeiro',
      is_correct: false,
    },
    {
      title: 'Falso',
      is_correct: false,
    },
  ],
  tags: [],
};

export const MockupQuestionMultipleChoice = {
  copy: false,
  title: '',
  timer: 30,
  image: null,
  availableOnQuestionsDB: false,
  answer: [
    {
      title: '',
      is_correct: false,
    },
    {
      title: '',
      is_correct: false,
    },
    {
      title: '',
      is_correct: false,
    },
    {
      title: '',
      is_correct: false,
    },
  ],
  tags: [],
};

export const initialValue = [
  {
    copy: false,
    title: '',
    correctAnswer: true,
    timer: 30,
    image: null,
    availableOnQuestionsDB: false,
    answer: [
      {
        title: '',
        is_correct: false,
      },
      {
        title: '',
        is_correct: false,
      },
      {
        title: '',
        is_correct: true,
      },
      {
        title: '',
        is_correct: false,
      },
    ],
    tags: [],
  },
];

const QuestionQuiz = ({ children }) => {
  const [questions, setQuestions] = useState(initialValue);
  const [isSaved, setSaved] = useState(true);

  const getAllQuestionOfTheQuiz = async (id) => {
    const response = await api.get(`/question/quiz/${id}`);

    if (response.status !== 200) return initialValue[0];

    const initialQuestions = response.data.map((question) => ({
      id: question.id,
      copy: false,
      availableOnQuestionsDB: false,
      image: null,
      title: question.title,
      timer: question.timer,
      difficultyLevel: question.difficultyLevel,
      tags: question.tags_question.map((tag) => tag.name),
      answer: question.answer,
    }));

    setQuestions(initialQuestions);
    return initialQuestions[0];
  };

  const saveQuestionOnDatabase = () => {
    setSaved(true);

    const schemeQuestion = yup.object().shape({
      id: yup.number().required(),
      copy: yup.boolean().required(),
      availableOnQuestionsDB: yup.boolean().required(),
      // eslint-disable-next-line react/forbid-prop-types
      image: yup.object().nullable(),
      title: yup.string().min(1).required(),
      timer: yup.number().required(),
      difficultyLevel: yup.number().required(),
      tags: yup.array().of(yup.string()).required(),
      // eslint-disable-next-line react/forbid-prop-types
      answer: yup.array().of(yup.object()),
    });

    questions.map(async (question) => {
      if (!(await schemeQuestion.isValid(question))) {
        console.log('invalido', question);
      } else {
        console.log('valido', question);
      }
    });
  };

  const addQuestion = (item) => {
    setSaved(false);
    setQuestions((prevState) => [...prevState, item]);
  };

  const removeQuestion = (index) => {
    setSaved(false);
    const newQuestions = questions.filter((element, i) => i !== index);
    setQuestions(newQuestions);
  };

  const updateQuestion = ({ value, key, index }) => {
    setSaved(false);
    const newQuestions = questions.map((question, i) => {
      if (i === index) {
        return {
          ...question,
          [key]: value,
        };
      }

      return question;
    });

    setQuestions(newQuestions);
  };

  const updateAnswer = ({ value, key, indexQuestion, indexAnswer }) => {
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
                  [key]: value,
                };
              }

              return answer;
            }),
          ],
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
        getAllQuestionOfTheQuiz,
        addQuestion,
        removeQuestion,
        MockupQuestionTrueOrFalse,
        MockupQuestionMultipleChoice,
        updateQuestion,
        updateAnswer,
        saveQuestionOnDatabase,
      }}
    >
      {children}
    </QuestionQuizContext.Provider>
  );
};

QuestionQuiz.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuestionQuiz;

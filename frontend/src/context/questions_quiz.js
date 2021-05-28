import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import api from '@api';
import * as yup from 'yup';

export const QuestionQuizContext = createContext();

export const MockupQuestionTrueOrFalse = {
  id: -1,
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
  id: -1,
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
    id: -1,
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
  const initialValueErrors = {
    title: false,
    is_correct: false,
    answer: false,
  };

  const [questions, setQuestions] = useState(initialValue);
  const [isSaved, setSaved] = useState(true);
  const [isTyping, setTyping] = useState(false);
  const [errors, setErrors] = useState(initialValueErrors);

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
  };

  const addQuestion = (item) => {
    setQuestions((prevState) => [...prevState, item]);
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((element, i) => i !== index);
    setQuestions(newQuestions);
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const updateQuestion = ({ value, key, index }) => {
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
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const updateAnswer = ({ value, key, indexQuestion, indexAnswer }) => {
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
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const validationSchemeQuestion = yup.object().shape({
    id: yup.number().required(),
    copy: yup.boolean().required(),
    availableOnQuestionsDB: yup.boolean().required(),
    image: yup.object().nullable(),
    title: yup.string().min(1).required(),
    timer: yup.number().required(),
    difficultyLevel: yup.number(),
    tags: yup.array().of(yup.string()).required(),
    answer: yup
      .array()
      .of(
        yup.object().shape({
          title: yup.string().required(),
          is_correct: yup.bool().required(),
        })
      )
      .test((answer) => {
        // eslint-disable-next-line camelcase
        const isRight = answer.map(({ is_correct }) => is_correct);
        if (!isRight.includes(true)) {
          return new yup.ValidationError(
            'Please check one checkbox',
            null,
            'is_correct'
          );
        }
        return true;
      }),
  });

  return (
    <QuestionQuizContext.Provider
      value={{
        questions,
        isSaved,
        setSaved,
        isTyping,
        setTyping,
        setQuestions,
        getAllQuestionOfTheQuiz,
        addQuestion,
        removeQuestion,
        MockupQuestionTrueOrFalse,
        MockupQuestionMultipleChoice,
        updateQuestion,
        updateAnswer,
        saveQuestionOnDatabase,
        validationSchemeQuestion,
        errors,
        setErrors,
        initialValueErrors,
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

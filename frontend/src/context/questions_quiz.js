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
  imageObj: null,
  imageUrl: '',
  difficultyLevel: 3,
  availableOnQuestionsDB: false,
  answer: [
    {
      id: -1,
      title: 'Verdadeiro',
      is_correct: false,
    },
    {
      id: -1,
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
  difficultyLevel: 3,
  imageObj: null,
  imageUrl: '',
  availableOnQuestionsDB: false,
  answer: [
    {
      id: -1,
      title: '',
      is_correct: false,
    },
    {
      id: -1,
      title: '',
      is_correct: false,
    },
    {
      id: -1,
      title: '',
      is_correct: false,
    },
    {
      id: -1,
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
    timer: 30,
    imageObj: null,
    imageUrl: '',
    difficultyLevel: 3,
    availableOnQuestionsDB: false,
    answer: [
      {
        id: -1,
        title: '',
        is_correct: false,
      },
      {
        id: -1,
        title: '',
        is_correct: false,
      },
      {
        id: -1,
        title: '',
        is_correct: false,
      },
      {
        id: -1,
        title: '',
        is_correct: false,
      },
    ],
    tags: [],
  },
];

const initialValueErrors = {
  title: false,
  is_correct: false,
  answer: false,
};

const QuestionQuiz = ({ children }) => {
  const [questions, setQuestions] = useState(initialValue);
  const [isSaved, setSaved] = useState(true);
  const [isTyping, setTyping] = useState(false);
  const [errors, setErrors] = useState(initialValueErrors);
  const [questionToRemove, setQuestionToRemove] = useState([]);

  const getAllQuestionOfTheQuiz = async (id) => {
    const response = await api.get(`/question/quiz/${id}`);

    if (response.status !== 200) return initialValue[0];
    const initialQuestions = response.data.map((question) => ({
      id: question.id,
      copy: question.copy,
      availableOnQuestionsDB: question.available_on_questions_db,
      imageObj: null,
      imageUrl: question.image_question ? question.image_question.url : '',
      title: question.title,
      timer: question.timer,
      difficultyLevel: question.difficulty_level,
      tags: question.tags_question.map((tag) => tag.name),
      answer: question.answer,
    }));
    setQuestions(initialQuestions);
    return initialQuestions[0];
  };

  // eslint-disable-next-line camelcase
  const saveQuestionOnDatabase = (id_quiz) => {
    try {
      questionToRemove.map((removed) =>
        api.delete('/question/delete', { data: { id: removed.id } })
      );

      questions.map(async (item) => {
        let responseFile = null;
        if (item.imageObj !== null) {
          const file = new FormData();
          file.append('file', item.imageObj);

          responseFile = await api.post('/files', file);
        }

        if (responseFile) {
          item.id_image = responseFile.data.id;
        }

        const response = await api.post('/question/create', {
          ...item,
          quiz_id: id_quiz,
        });
        if (response.status !== 200) throw new Error('questao nao criada');
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    setTimeout(() => getAllQuestionOfTheQuiz(id_quiz), 1000);
    setSaved(true);
    return true;
  };

  const addQuestion = (item) => {
    const updatedQuestions = [...questions, { ...item }];
    setQuestions(updatedQuestions);
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const removeQuestion = (index) => {
    const updatedQuestion = questions.filter((element, i) => i !== index);

    setQuestionToRemove((prevState) => [...prevState, questions[index]]);
    setQuestions(updatedQuestion);
    setSaved(false);
    setErrors(initialValueErrors);

    return updatedQuestion;
  };

  const updateQuestion = ({ value, key, index }) => {
    setQuestions((prevState) =>
      prevState.map((question, i) => {
        if (i === index) {
          return {
            ...question,
            [key]: value,
          };
        }

        return question;
      })
    );
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const updateAnswer = ({ value, key, indexQuestion, indexAnswer }) => {
    setQuestions((prevState) =>
      prevState.map((question, i) => {
        if (i === indexQuestion) {
          return {
            ...question,
            answer: [
              ...question.answer.map((answerItem, index) => {
                if (index === indexAnswer) {
                  return {
                    ...answerItem,
                    [key]: value,
                  };
                }

                return answerItem;
              }),
            ],
          };
        }

        return question;
      })
    );
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const validationSchemeArrayQuestion = yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      copy: yup.boolean().required(),
      availableOnQuestionsDB: yup.boolean().required(),
      // eslint-disable-next-line react/forbid-prop-types
      imageObj: yup.object().nullable(),
      imageUrl: yup.string(),
      timer: yup.number().required(),
      difficultyLevel: yup.number(),
      tags: yup.array().of(yup.string()).required(),
      answer: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number().required(),
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
    })
  );

  const validationSchemeQuestion = yup.object().shape({
    id: yup.number().required(),
    copy: yup.boolean().required(),
    availableOnQuestionsDB: yup.boolean().required(),
    // eslint-disable-next-line react/forbid-prop-types
    imageObj: yup.object().nullable(),
    imageUrl: yup.string(),
    title: yup.string().min(1).required(),
    timer: yup.number().required(),
    difficultyLevel: yup.number(),
    tags: yup.array().of(yup.string()).required(),
    answer: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().required(),
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
        validationSchemeArrayQuestion,
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

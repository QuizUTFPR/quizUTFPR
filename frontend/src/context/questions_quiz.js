import React, { createContext, useState } from 'react';
// import PropTypes from 'prop-types';
import api from '@api';
import * as yup from 'yup';

// UTILS
// import getBase64 from '@utils/getBase64OfImage';

import {
  TrueOrFalseAnswer,
  MultipleChoiceAnswer,
  MockupQuestionTrueOrFalse,
  MockupQuestionMultipleChoice,
  initialValue,
  initialValueErrors,
} from './mockups_question_quiz';

export const QuestionQuizContext = createContext();

const QuestionQuiz = ({ children }) => {
  const [questions, setQuestions] = useState(initialValue);
  const [isSaved, setSaved] = useState(true);
  const [isTyping, setTyping] = useState(false);
  const [errors, setErrors] = useState(initialValueErrors);
  const [questionToRemove, setQuestionToRemove] = useState([]);

  const getAllQuestionOfTheQuiz = async (id) => {
    try {
      const response = await api.get(`/question/quiz/${id}`);
      const initialQuestions = response.data.map((question) => ({
        id: question.id,
        type: question.type,
        copy: question.copy,
        availableOnQuestionsDB: question.availableOnQuestionsDb,
        imageObj: null,
        imageBase64: question.imageBase64,
        imageUrl: question?.imageQuestion?.url,
        title: question.title,
        timer: question.timer,
        difficultyLevel: question.difficultyLevel,
        tags: question.tagsQuestion.map((tag) => tag.name),
        answer: question.answer,
      }));

      console.log(initialQuestions);

      setQuestions(initialQuestions);
      return initialQuestions[0];
    } catch (error) {
      return initialValue[0];
    }
  };

  const saveQuestionOnDatabase = (quizId) => {
    try {
      if (questionToRemove.length) {
        questionToRemove.map((removed) =>
          api.delete('/question/delete', { data: { id: removed.id } })
        );
      }

      questions.map(async (item, index) => {
        const {
          id,
          type,
          copy,
          availableOnQuestionsDB,
          imageObj,
          title,
          timer,
          difficultyLevel,
          tags,
          answer,
        } = item;

        const body = {
          id,
          type,
          copy,
          availableOnQuestionsDB,
          title,
          timer,
          difficultyLevel,
          tags,
          answer,
          index,
          quizId,
        };

        const file = new FormData();
        file.append('file', imageObj);
        file.append('values', JSON.stringify(body));

        const response = await api.post('/question/create', file);

        if (response.status !== 200) throw new Error('questao nao criada');
      });
      setTimeout(() => getAllQuestionOfTheQuiz(quizId), 1000);
      setSaved(true);
    } catch (error) {
      setSaved(false);
    }
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
    setQuestions((prevState) => {
      const newData = [...prevState];
      newData[index] = {
        ...newData[index],
        [key]: value,
      };

      return newData;
    });
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const updateAnswer = ({ value, key, indexQuestion, indexAnswer }) => {
    setQuestions((prevState) => {
      const newData = [...prevState];
      newData[indexQuestion].answer[indexAnswer] = {
        ...newData[indexQuestion].answer[indexAnswer],
        [key]: value,
      };

      return newData;
    });
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const changeTypeQuestion = ({
    indexQuestion,
    type,
    handleClose,
    formikUpdate,
    formikTypeID,
    formikAnswerID,
  }) => {
    const choosedType =
      type === 'multipleChoice' ? MultipleChoiceAnswer : TrueOrFalseAnswer;
    formikUpdate(formikTypeID, type);
    formikUpdate(formikAnswerID, choosedType);

    setQuestions((prevState) => {
      const newData = [...prevState];
      newData[indexQuestion] = {
        ...newData[indexQuestion],
        type,
        answer: choosedType,
      };
      return newData;
    });

    handleClose();
    setSaved(false);
    setErrors(initialValueErrors);
  };

  const questionToDown = (index, handleChangeQuestion) => {
    const targetQuestion = questions[index];

    setQuestions((prevState) => [
      ...prevState.slice(0, index),
      prevState[index + 1],
      prevState[index],
      ...prevState.slice(index + 2),
    ]);
    setSaved(false);
    setErrors(initialValueErrors);
    handleChangeQuestion(targetQuestion, index + 1)();
  };
  const questionToUp = (index, handleChangeQuestion) => {
    const targetQuestion = questions[index];

    setQuestions((prevState) => [
      ...prevState.slice(0, index - 1),
      prevState[index],
      prevState[index - 1],
      ...prevState.slice(index + 1),
    ]);
    setSaved(false);
    setErrors(initialValueErrors);
    handleChangeQuestion(targetQuestion, index - 1)();
  };

  const validationSchemeArrayQuestion = yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      type: yup.string().required(),
      copy: yup.boolean().required(),
      availableOnQuestionsDB: yup.boolean().required(),
      // eslint-disable-next-line react/forbid-prop-types
      imageObj: yup.object().nullable(),
      // imageUrl: yup.string(),
      imageBase64: yup.string(),
      title: yup.string().min(1).required(),
      timer: yup.number().required(),
      difficultyLevel: yup.string().required(),
      tags: yup.array().of(yup.string()).required(),
      answer: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number().required(),
            title: yup.string().required(),
            isCorrect: yup.bool().required(),
          })
        )
        .test((answer) => {
          // eslint-disable-next-line camelcase
          const isRight = answer.map(({ isCorrect }) => isCorrect);
          if (!isRight.includes(true)) {
            return new yup.ValidationError(
              'Please check one checkbox',
              null,
              'isCorrect'
            );
          }
          return true;
        }),
    })
  );

  const validationSchemeQuestion = yup.object().shape({
    id: yup.number().required(),
    type: yup.string().required(),
    copy: yup.boolean().required(),
    availableOnQuestionsDB: yup.boolean().required(),
    // eslint-disable-next-line react/forbid-prop-types
    imageObj: yup.object().nullable(),
    // imageUrl: yup.string(),
    imageBase64: yup.string(),
    title: yup.string().min(1).required(),
    timer: yup.number().required(),
    difficultyLevel: yup.string().required(),
    tags: yup.array().of(yup.string()).required(),
    answer: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().required(),
          title: yup.string().required(),
          isCorrect: yup.bool().required(),
        })
      )
      .test((answer) => {
        // eslint-disable-next-line camelcase
        const isRight = answer.map(({ isCorrect }) => isCorrect);
        if (!isRight.includes(true)) {
          return new yup.ValidationError(
            'Please check one checkbox',
            null,
            'isCorrect'
          );
        }
        return true;
      }),
  });

  return (
    <QuestionQuizContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
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
        changeTypeQuestion,
        saveQuestionOnDatabase,
        validationSchemeQuestion,
        validationSchemeArrayQuestion,
        errors,
        setErrors,
        initialValueErrors,
        questionToDown,
        questionToUp,
      }}
    >
      {children}
    </QuestionQuizContext.Provider>
  );
};

export default QuestionQuiz;

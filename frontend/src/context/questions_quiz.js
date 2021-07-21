import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import api from '@api';
import * as yup from 'yup';

// UTILS
import getBase64 from '@utils/getBase64OfImage';

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
        availableOnQuestionsDB: question.available_on_questions_db,
        imageObj: null,
        imageBase64: question.image_base64,
        // imageUrl: question.image_question ? question.image_question.url : '',
        title: question.title,
        timer: question.timer,
        difficultyLevel: question.difficulty_level,
        tags: question.tags_question.map((tag) => tag.name),
        answer: question.answer,
      }));
      setQuestions(initialQuestions);
      return initialQuestions[0];
    } catch (error) {
      return initialValue[0];
    }
  };

  // eslint-disable-next-line camelcase
  const saveQuestionOnDatabase = (id_quiz) => {
    try {
      if (questionToRemove.length) {
        questionToRemove.map((removed) =>
          api.delete('/question/delete', { data: { id: removed.id } })
        );
      }

      questions.map(async (item, index) => {
        // let responseFile = null;
        let base64 = item.imageBase64;

        if (item.imageObj !== null) {
          base64 = await getBase64(item.imageObj);

          // const file = new FormData();
          // file.append('file', item.imageObj);
          // responseFile = await api.post('/files', file);
        }

        // if (responseFile) {
        //   item.id_image = responseFile.data.id;
        // }

        const response = await api.post('/question/create', {
          ...item,
          quiz_id: id_quiz,
          index,
          imageBase64: base64,
        });

        if (response.status !== 200) throw new Error('questao nao criada');
      });
      setTimeout(() => getAllQuestionOfTheQuiz(id_quiz), 1000);
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

  const changeTypeQuestion = ({
    indexQuestion,
    type,
    handleClose,
    formikUpdate,
    formikTypeID,
    formikAnswerID,
  }) => {
    const choosedType =
      type === 'multiple_choice' ? MultipleChoiceAnswer : TrueOrFalseAnswer;
    formikUpdate(formikTypeID, type);
    formikUpdate(formikAnswerID, choosedType);

    setQuestions((prevState) =>
      prevState.map((question, i) => {
        if (i === indexQuestion) {
          return {
            ...question,
            type,
            answer: choosedType,
          };
        }
        return question;
      })
    );

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

QuestionQuiz.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuestionQuiz;

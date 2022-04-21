/* eslint-disable no-underscore-dangle */
import React, { createContext, useEffect, useState } from 'react';
import api from '@api';
import * as yup from 'yup';
import { read, utils } from 'xlsx';

import {
  TrueOrFalseAnswer,
  MultipleChoiceAnswer,
  MockupQuestionTrueOrFalse,
  MockupQuestionMultipleChoice,
  initialValue,
  initialValueErrors,
  OptionsOfTime,
  optionsOfDifficultyLevel,
  excelTypeOfQuestion,
} from './mockupsQuestionQuiz';

export const QuestionQuizContext = createContext();

const QuestionQuiz = ({ children }) => {
  const [questions, setQuestions] = useState(
    JSON.parse(JSON.stringify(initialValue))
  );
  const [isSaved, setSaved] = useState(true);
  const [isTyping, setTyping] = useState(false);
  const [errors, setErrors] = useState(
    JSON.parse(JSON.stringify(initialValueErrors))
  );
  const [questionToRemove, setQuestionToRemove] = useState([]);

  const getAllQuestionOfTheQuiz = async (id) => {
    try {
      const { data } = await api.get(`/question/quiz/${id}`);
      const initialQuestions = data.map((question) => ({
        index: question.index,
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

      setQuestions(initialQuestions);
      return initialQuestions[0];
    } catch (error) {
      return initialValue[0];
    }
  };

  const saveQuestionOnDatabase = async (quizId) => {
    try {
      // REMOVING QUESTIONS
      if (questionToRemove.length) {
        questionToRemove.forEach(async (removed) => {
          if (removed.id !== -1) {
            await api.delete('/question/delete', {
              data: {
                id: removed.id,
              },
            });
          }
        });
      }
      // SAVING QUESTIONS
      await Promise.all(
        questions.map(async (item) => {
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
            imageUrl,
            index,
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
            quizId,
            imageUrl,
            index,
          };

          const file = new FormData();
          file.append('file', imageObj);
          file.append('values', JSON.stringify(body));

          const response = await api.post('/question/create', file);

          if (response.status !== 200) throw new Error('questao nao criada');
        })
      );

      getAllQuestionOfTheQuiz(quizId);
      setSaved(true);
      setQuestionToRemove([]);
    } catch (error) {
      setSaved(false);
    }
  };

  const addQuestion = (item) => {
    const newQuestion = {
      ...item,
      index: questions.length,
    };

    const updatedQuestions = [
      ...questions,
      {
        ...newQuestion,
      },
    ];
    setQuestions(updatedQuestions);
    setSaved(false);
    setErrors(initialValueErrors);

    return newQuestion.index;
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
      type === 'multipleChoice'
        ? JSON.parse(JSON.stringify(MultipleChoiceAnswer))
        : JSON.parse(JSON.stringify(TrueOrFalseAnswer));

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

  const handleAddQuestionFromExcelFile = (questionsFromExcel) => {
    try {
      const cells = {
        title: (data) => data.__EMPTY_1,
        type: (data) => data.__EMPTY_2,
        answer1: (data) => data.__EMPTY_3,
        answer2: (data) => data.__EMPTY_4,
        answer3: (data) => data.__EMPTY_5,
        answer4: (data) => data.__EMPTY_6,
        correctAnswers: (data) => data.__EMPTY_7,
        timer: (data) => data.__EMPTY_8,
        difficultyLevel: (data) => data.__EMPTY_9,
        availableOnQuestionsDB: (data) => data.__EMPTY_10,
        tags: (data) => data.__EMPTY_11,
      };

      let actualSizeOfQuestions = questions.length;
      const arrayOfQuestions = [];

      questionsFromExcel.forEach((item) => {
        const lengthOfRow = Object.keys(item).length;
        if (lengthOfRow > 1) {
          const type = excelTypeOfQuestion[cells.type(item)];
          let mockup = JSON.parse(JSON.stringify(MockupQuestionTrueOrFalse));
          let correctAnswer = cells.correctAnswers(item);

          if (correctAnswer.length > 1) {
            correctAnswer = correctAnswer.split(',').map(Number);
          }

          if (type === 'multipleChoice') {
            mockup = JSON.parse(JSON.stringify(MockupQuestionMultipleChoice));
          } else if (correctAnswer.length > 1) {
            throw new Error('erro v ou f');
          }

          const hasMoreThanOneCorrectAnswer = Array.isArray(correctAnswer);
          mockup.answer.forEach((answerItem, idx) => {
            answerItem.title = cells[`answer${idx + 1}`](item);
            answerItem.isCorrect = hasMoreThanOneCorrectAnswer
              ? correctAnswer.includes(idx + 1)
              : correctAnswer - 1 === idx;
          });

          const newQuestion = {
            ...mockup,
            type,
            title: cells.title(item),
            timer: OptionsOfTime[cells.timer(item)],
            difficultyLevel:
              optionsOfDifficultyLevel[cells.difficultyLevel(item)],
            availableOnQuestionsDB:
              cells.availableOnQuestionsDB(item) === 'SIM',
            tags: [
              ...new Set(
                cells
                  .tags(item)
                  .split(',')
                  .map((element) => element.toLowerCase().trim())
              ),
            ],
          };

          arrayOfQuestions.push({
            ...newQuestion,
            index: actualSizeOfQuestions,
          });
          actualSizeOfQuestions += 1;
        }
      });

      const updatedQuestions = [...questions, ...arrayOfQuestions];
      setQuestions(updatedQuestions);
      setSaved(false);
      setErrors(initialValueErrors);

      return true;
    } catch (error) {
      return error;
    }
  };

  const handleReadExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file[0]);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const sheet = read(bufferArray, {
          type: 'buffer',
        });

        const sheetName = sheet.SheetNames[0];
        const targetSheet = sheet.Sheets[sheetName];

        const dataJson = utils.sheet_to_json(targetSheet);

        resolve(handleAddQuestionFromExcelFile(dataJson.slice(5)));
      };

      fileReader.onerror = (e) => reject(e);
    });
  };

  const validationSchemeArrayQuestion = yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      type: yup.string().required(),
      copy: yup.boolean().required(),
      availableOnQuestionsDB: yup.boolean().required(),
      // eslint-disable-next-line react/forbid-prop-types
      imageObj: yup.object().nullable(),
      imageUrl: yup.string(),
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
    imageUrl: yup.string(),
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
        initialValue,
        initialValueErrors,
        questionToDown,
        questionToUp,
        handleReadExcelFile,
        OptionsOfTime,
        optionsOfDifficultyLevel,
        setQuestionToRemove,
      }}
    >
      {children}
    </QuestionQuizContext.Provider>
  );
};

export default QuestionQuiz;

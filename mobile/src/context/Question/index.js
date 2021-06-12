import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Array } from '../../pages/Question/question';

export const QuestionContext = createContext();

const Question = ({ children }) => {
  const initialValue = {
    questions: Array,
    indexOnScreen: 0,
  };

  const initialRequestQuestion = {
    idQuiz: -1,
    idQuestion: -1,
    checkedAnswer: [false, false, false, false],
  };

  const [quizData, setQuizData] = useState(initialValue);
  const [requestQuestion, setRequestQuestion] = useState(
    initialRequestQuestion
  );

  const getQuestionsOfQuizFromDatabase = (idQuiz) => {
    console.log('id do quiz', idQuiz);
    setQuizData(initialValue);
  };

  const changeToNextQuestion = () => {
    if (quizData.indexOnScreen === quizData.questions.length - 1) {
      console.log('Chegou no limite!');
    } else {
      setQuizData((prevState) => ({
        ...prevState,
        indexOnScreen: prevState.indexOnScreen + 1,
      }));
    }
  };

  const handleSetCheckedAnswer = (index) => {
    setRequestQuestion((prevState) => {
      const newCheckedAnswer = prevState.checkedAnswer;
      newCheckedAnswer[index] = !newCheckedAnswer[index];

      return {
        ...prevState,
        checkedAnswer: newCheckedAnswer,
      };
    });
  };

  const handleSaveRequestQuestionOnDatabase = () => {
    console.log('salvou');
    setRequestQuestion(initialRequestQuestion);
  };

  return (
    <QuestionContext.Provider
      value={{
        quizData,
        setQuizData,
        getQuestionsOfQuizFromDatabase,
        changeToNextQuestion,
        requestQuestion,
        handleSetCheckedAnswer,
        handleSaveRequestQuestionOnDatabase,
        initialRequestQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

Question.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Question;

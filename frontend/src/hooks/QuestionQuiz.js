import { useContext } from 'react';
import { QuestionQuizContext } from '../contexts/questions_quiz';

function useQuestionQuiz() {
  return useContext(QuestionQuizContext);
}

export default useQuestionQuiz;
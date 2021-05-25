import { useContext } from 'react';
import { QuestionQuizContext } from '@context/questions_quiz';

function useQuestionQuiz() {
  return useContext(QuestionQuizContext);
}

export default useQuestionQuiz;

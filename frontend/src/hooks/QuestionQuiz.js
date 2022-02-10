import { useContext } from 'react';
import { QuestionQuizContext } from '@context/questionsQuiz';

function useQuestionQuiz() {
  return useContext(QuestionQuizContext);
}

export default useQuestionQuiz;

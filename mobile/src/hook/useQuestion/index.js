import { useContext } from 'react';
import { QuestionContext } from '@context/Question';

function useQuestions() {
  return useContext(QuestionContext);
}

export default useQuestions;

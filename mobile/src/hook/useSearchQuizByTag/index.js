import { useContext } from 'react';
import { SearchQuizByTagContext } from '@context/SearchQuizByTag';

function useSearchQuizByTag() {
  return useContext(SearchQuizByTagContext);
}

export default useSearchQuizByTag;

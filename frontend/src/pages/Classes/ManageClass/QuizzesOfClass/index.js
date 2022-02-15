import React from 'react';

// Style
import { Wrapper } from './style';

const QuizzesOfClass = () => {
  return (
    <Wrapper
      key="quizzes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      quizzes
    </Wrapper>
  );
};

export default QuizzesOfClass;

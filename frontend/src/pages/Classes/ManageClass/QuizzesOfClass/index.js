import React from 'react';

// Style
import { Wrapper, QuizzesWrapper } from './style';

const QuizzesOfClass = () => {
  return (
    <Wrapper
      key="quizzes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <QuizzesWrapper>test</QuizzesWrapper>
    </Wrapper>
  );
};

export default QuizzesOfClass;

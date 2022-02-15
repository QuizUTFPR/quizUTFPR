import React from 'react';

// Style
import { Wrapper, StudentsWrapper } from './style';

const StudentOfClass = () => {
  return (
    <Wrapper
      key="students"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StudentsWrapper>estudantes</StudentsWrapper>
    </Wrapper>
  );
};

export default StudentOfClass;

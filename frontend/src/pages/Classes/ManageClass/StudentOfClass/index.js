import React from 'react';

// Style
import { Wrapper } from './style';

const StudentOfClass = () => {
  return (
    <Wrapper
      key="students"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      estudantes
    </Wrapper>
  );
};

export default StudentOfClass;

import React from 'react';

// Style
import { Wrapper } from './style';

const InfoOfClass = () => {
  return (
    <Wrapper
      key="info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      info
    </Wrapper>
  );
};

export default InfoOfClass;
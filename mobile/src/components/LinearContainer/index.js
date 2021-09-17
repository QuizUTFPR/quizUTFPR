import React from 'react';

import { QuestionContainer } from './style';

const LinearContainer = ({ children, ...props }) => (
  <QuestionContainer {...props}>{children}</QuestionContainer>
);

export default LinearContainer;

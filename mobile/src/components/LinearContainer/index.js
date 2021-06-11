import React from 'react';
import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

export const QuestionContainer = styled(LinearGradient).attrs({
  colors: ['#4B24B1', '#5929D3'],
})`
  flex: 1;
  flex-direction: column;
`;

const LinearContainer = ({ children, ...props }) => (
  <QuestionContainer {...props}>{children}</QuestionContainer>
);

export default LinearContainer;

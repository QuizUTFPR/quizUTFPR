import styled from 'styled-components/native';

// CUSTOM DIMENSIONS

export const QuizProgressBarBackground = styled.View`
  width: 100%;
  height: 15px;
  background: ${({ theme }) => theme.color.fill};
  border-radius: 30px;
`;

export const QuizProgressBar = styled.View`
  background: ${({ theme }) => theme.color.fill};
  width: ${({ porcentage }) => porcentage}%;
  height: 100%;
  border-radius: 30px;
`;

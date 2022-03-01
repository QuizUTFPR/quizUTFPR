import styled from 'styled-components/native';

export const QuizProgressBarBackground = styled.View`
  width: 100%;
  height: 15px;
  margin-left: 5px;
  margin-bottom: 5px;
  background: ${({ theme }) => theme.color.fill};
  border-radius: 30px;
`;

export const QuizProgressBar = styled.View`
  background: ${({ theme }) => theme.color.fill};
  width: ${({ porcentage }) => porcentage}%;
  height: 100%;
  border-radius: 30px;
`;

export const QuizProgressText = styled.Text`
  position: absolute;
  right: 5px;
  bottom: 0;
  color: ${({ theme }) => theme.color.fill};
  font-size: ${({ theme }) => theme.fontSize.normal}px;
  font-family: 'PoppinsBold';
`;

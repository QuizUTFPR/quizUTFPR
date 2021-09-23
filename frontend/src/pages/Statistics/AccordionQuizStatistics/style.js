import styled from 'styled-components';

import { Grid, Typography, Paper } from '@material-ui/core';

export const BarQuestion = styled(Grid).attrs({
  item: true,
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const QuizPercentageHit = styled(Paper).attrs({
  elevation: 3,
})`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  flex-direction: column;
`;

export const QuizPercentageHitDescription = styled(Typography)`
  margin-top: 20px;
  font-weight: 400;
  text-align: center;
`;

export const AnswerNumberOfChoices = styled(Typography)``;

export const StudentWrapper = styled(Grid)`
  padding: 10px;
`;

export const StudentInformation = styled(Grid)`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
`;

export const BoxStudent = styled.div``;

export const BoldText = styled.span`
  font-weight: 500;
`;

export const StudentName = styled.span``;

export const WrapperStudentChoice = styled.div``;

export const BadgeStudentChoice = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  width: max-content;
  padding: 6px 20px;
  border-radius: 30px;
  color: white;
  font-weight: 400;
  margin: 5px;
`;

export const IsStudentChoiceCorrect = styled(Typography)`
  align-self: center;
`;

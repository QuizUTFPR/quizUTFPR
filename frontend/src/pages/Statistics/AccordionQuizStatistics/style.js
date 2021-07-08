import styled from 'styled-components';

import { Grid, Typography, Paper } from '@material-ui/core';

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

export const AnswerWrapper = styled(Grid)``;

const Answer = styled.div`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  margin-top: 10px;
`;

export const AnswerItem = styled(Answer)`
  display: flex;
  align-content: center;
  justify-content: space-between;
  border-left: 10px solid ${({ correct }) => (correct ? 'green' : 'red')};
`;

export const AnswerTitle = styled(Typography)``;
export const AnswerNumberOfChoices = styled(Typography)``;

export const WrapperResumeOfQuestion = styled(Grid)`
  margin: 30px 0;
`;

export const WrapperResumeQuestion = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 0 20px;
`;

export const TextTitleResumeOfQuestion = styled(Typography)``;
export const TextValueResumeOfQuestion = styled(Typography)``;

export const StudentWrapper = styled(Grid)`
  padding: 10px;
`;

export const HeaderTitle = styled(Typography)`
  font-weight: bolder;
  font-size: 1.2em;
  text-align: center;
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

export const NameStudent = styled(Typography)`
  font-weight: 500;
`;

export const ChoiceStudent = styled(Typography)``;

export const IsStudentChoiceCorrect = styled(Typography)`
  align-self: center;
`;

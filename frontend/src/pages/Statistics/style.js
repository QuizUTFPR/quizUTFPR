import styled from 'styled-components';

import { Typography, AccordionSummary, Grid } from '@mui/material';

export const TitlePage = styled(Typography)`
  overflow: hidden;
  text-align: center;
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
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
  background: ${({ studentChecked, theme }) =>
    studentChecked ? theme.palette.yellow.main : ''};
`;

export const AnswerTitle = styled.p`
  margin: 0;
  color: ${({ studentChecked }) => (studentChecked ? 'white' : '')};
  font-weight: ${({ studentChecked }) => (studentChecked ? 'bolder' : 400)};
`;

export const HeaderTitle = styled(Typography)`
  font-weight: bolder;
  font-size: 1.2em;
  text-align: center;
`;

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

export const TitleWrapper = styled.div`
  flex-grow: 1;
  padding-left: 16%;
`;

export const ContainerSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 15%;
`;

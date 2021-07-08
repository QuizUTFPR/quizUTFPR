import styled from 'styled-components';

import { Grid, Typography } from '@material-ui/core';

export const StudentBar = styled(Grid).attrs({
  item: true,
})`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
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

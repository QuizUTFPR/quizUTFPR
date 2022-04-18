import styled from 'styled-components';

import { Grid, Typography, Paper } from '@mui/material';

export const StudentBar = styled(Grid).attrs({
  item: true,
})`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

export const StyledTypography = styled(Typography)`
  margin-top: 20px;
  font-weight: 400;
  text-align: center;
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

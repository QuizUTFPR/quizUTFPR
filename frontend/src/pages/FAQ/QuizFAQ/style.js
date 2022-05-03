import styled from 'styled-components';

import { Grid, Typography } from '@mui/material';

export const BarQuestion = styled(Grid).attrs({
  item: true,
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const StyledTypography = styled(Typography).attrs({
  variant: 'h5',
})`
  margin-top: 15px;
  font-weight: 500;

  &:first-child {
    margin-top: 0px;
  }
`;

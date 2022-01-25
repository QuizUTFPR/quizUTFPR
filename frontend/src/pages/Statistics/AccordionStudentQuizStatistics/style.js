import styled from 'styled-components';

import { Grid, Typography } from '@mui/material';

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

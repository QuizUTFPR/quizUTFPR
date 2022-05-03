import styled from 'styled-components';

import { Grid } from '@mui/material';

export const BarQuestion = styled(Grid).attrs({
  item: true,
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

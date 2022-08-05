import styled from 'styled-components';

import { Grid } from '@mui/material';

export const GridContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 40px;
  background: ${({ theme }) => theme.palette.background.bgContainer};
  border-radius: 5px;
  width: ${({ width }) => width || 'calc(100vw - 340px)'};
  overflow-wrap: break-word;
  overflow: hidden;
`;

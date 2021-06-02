import styled from 'styled-components';

import { Grid } from '@material-ui/core';

export const GridContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 30px;
  background: ${({ theme }) => theme.palette.background.bgContainer};
  border-radius: 5px;
  overflow-wrap: break-word;
`;

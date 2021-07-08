import styled from 'styled-components';

import { Grid } from '@material-ui/core';

export const StudentBar = styled(Grid).attrs({
  item: true,
})`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

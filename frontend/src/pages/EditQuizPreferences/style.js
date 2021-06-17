import styled from 'styled-components';
import GridContainer from '@components/Container';

import { Grid } from '@material-ui/core';

export const GridContainerModal = styled(GridContainer)`
  max-height: 90vh;
  flex-wrap: nowrap;
  overflow-y: scroll;
`;

export const PreviewImage = styled.img`
  max-height: 400px;
  margin: 0 auto;
`;

export const FormWrapper = styled(Grid)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
`;

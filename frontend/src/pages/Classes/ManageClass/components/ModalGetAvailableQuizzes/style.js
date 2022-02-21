import styled from 'styled-components';
import GridContainer from '@components/Container';

import { Grid } from '@mui/material';

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
  flex-direction: column;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
  position: relative;
`;

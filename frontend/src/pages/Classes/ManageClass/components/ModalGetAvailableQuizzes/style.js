import styled from 'styled-components';
import Wrapper from '@components/RefferedContainer';

import { Grid } from '@mui/material';

export const GridContainerModal = styled(Wrapper)`
  max-height: 90vh;
  flex-wrap: nowrap;
  overflow-y: scroll;
  width: 40vw;
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

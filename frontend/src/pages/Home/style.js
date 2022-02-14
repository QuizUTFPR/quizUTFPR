import styled from 'styled-components';

import GridContainer from '@components/Container';

// LOGO UTFPR
import { ReactComponent as UTFPR } from '@assets/marcaUTFPR/logoUTFPR.svg';

export const LogoUTFPR = styled(UTFPR)`
  width: 450px;
  height: 100%;
`;

export const StyledHomeGrid = styled(GridContainer)`
  flex-direction: column;
`;

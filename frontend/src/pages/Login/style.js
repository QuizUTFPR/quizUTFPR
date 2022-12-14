import styled from 'styled-components';

// import MyBackgound from '@assets/background_login_copy.svg';
import { ReactComponent as UTFPR } from '@assets/marcaUTFPR/logoUTFPR.svg';

import Button from '@components/Button';
import { Container, Grid, Typography, TextField } from '@mui/material';

export const StyledContainer = styled(Container)`
  background: white;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  background: #f4f5f9;
`;

export const DescriptionsGrid = styled(Grid)`
  padding-bottom: 20px;
`;

export const Title = styled(Typography)`
  font-weight: 700;
  margin-bottom: 10px;
`;

export const Subtitle = styled(Typography)`
  font-weight: 500;
  opacity: 0.7;
`;

export const GridForm = styled(Grid)`
  width: 100%;
`;

export const StyledInput = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
  background: white;
  border-radius: 6px;
  background: transparent;
`;

export const StyledButton = styled(Button)`
  && {
    /* width: 50%; */
    min-width: 300px;
    height: 50px;
    font-weight: bolder;
    font-size: 1.3em;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    white-space: nowrap;
    gap: 8px;
  }
`;

export const LogoUTFPR = styled(UTFPR)`
  width: 450px;
  height: 100%;
`;

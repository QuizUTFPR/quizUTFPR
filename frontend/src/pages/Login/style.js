import styled from 'styled-components';

import MyBackgound from '@assets/background_login.svg';

import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';

export const StyledContainer = styled(Container)`
  background: white;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  padding: 0 200px;
  background-image: url(${MyBackgound});
  background-size: cover;
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
`;

export const StyledButton = styled(Button)`
  && {
    width: 50%;
    height: 50px;
    font-weight: bolder;
    font-size: 1.3em;
  }
`;

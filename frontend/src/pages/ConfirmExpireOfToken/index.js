import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Grid } from '@mui/material';
import Button from '@components/Button';
import { HOME } from '@routes';
import ErrorIcon from '@mui/icons-material/Error';
import { StyledGridContainer } from './style';

const ConfirmExpireOfToken = () => {
  const navigate = useNavigate();

  return (
    <StyledGridContainer
      spacing={3}
      container
      justifyContent="center"
      align="center"
    >
      <Grid item xs={12}>
        <ErrorIcon style={{ fontSize: 50 }} color="primary" />
        <Typography variant="h5" color="primary" component="h5">
          Sua sessão expirou! Para continuar você precisa realizar o login
          novamente...
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(HOME)}
          loading={false}
        >
          Logar Novamente
        </Button>
      </Grid>
    </StyledGridContainer>
  );
};

export default ConfirmExpireOfToken;

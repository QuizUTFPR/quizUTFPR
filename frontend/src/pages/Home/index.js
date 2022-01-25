import React from 'react';

// COMPONENTS
import { Typography, Grid } from '@mui/material';

// STYLE
import { LogoUTFPR, StyledHomeGrid } from './style';

const Home = () => (
  <StyledHomeGrid container justifyContent="center" align="center">
    <Grid item xs={12}>
      <LogoUTFPR />
    </Grid>
    <Grid item xs={12}>
      <Typography color="primary">
        Seja Bem-Vindo ao Painel de Controle
      </Typography>
    </Grid>
  </StyledHomeGrid>
);

export default Home;

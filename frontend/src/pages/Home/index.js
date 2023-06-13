import React from 'react';

// COMPONENTS
import { Typography, Grid } from '@mui/material';

// STYLE
import { LogoUTFPR, StyledHomeGrid } from './style';

const Home = () => {
  return (
    <StyledHomeGrid justifyContent="center" align="center">
      <Grid item xs={12}>
        <LogoUTFPR />
      </Grid>
      <Grid item>
        <Typography color="primary">
          Bem-vindo ao painel de controle.
        </Typography>
      </Grid>
    </StyledHomeGrid>
  );
};

export default Home;

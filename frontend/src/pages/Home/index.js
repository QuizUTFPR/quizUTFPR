import React from 'react';
// import { createClient } from 'pexels';

// COMPONENTS
import { Typography, Grid } from '@mui/material';

// STYLE
import { LogoUTFPR, StyledHomeGrid } from './style';

const Home = () => {
  // const client = createClient(process.env.REACT_APP_TOKEN_PEXELS);

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

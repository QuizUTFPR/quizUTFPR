import React from 'react';
// import { createClient } from 'pexels';

// COMPONENTS
import { Typography, Grid } from '@mui/material';

// STYLE
import { LogoUTFPR, StyledHomeGrid } from './style';

const TESTE = process.env.REACT_APP_TOKEN_PEXELS;

const Home = () => {
  console.log(TESTE);

  const teste = async (args) => {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${args}&?page=1&per_page=40?orientation="landscape"`,
      {
        methods: 'GET',
        headers: {
          Authorization: TESTE,
        },
      }
    );

    console.log('response', await response.json());
  };

  React.useEffect(() => {
    console.log('teste');
    teste('code, comida');
  }, []);
  // const client = createClient(process.env.REACT_APP_TOKEN_PEXELS);

  return (
    <StyledHomeGrid justifyContent="center" align="center">
      <Grid item xs={12}>
        <LogoUTFPR />
      </Grid>
      <Grid item>
        <Typography color="primary">
          Seja Bem-Vindo ao Painel de Controle
        </Typography>
      </Grid>
    </StyledHomeGrid>
  );
};

export default Home;

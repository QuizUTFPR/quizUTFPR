import React from 'react';
import styled from 'styled-components';

// LOGO UTFPR
import { ReactComponent as UTFPR } from '@assets/marcaUTFPR/logoUTFPR.svg';

import { Typography, Grid } from '@material-ui/core';

// COMPONENTS
import GridContainer from '@components/Container';

const LogoUTFPR = styled(UTFPR)`
  width: 450px;
  height: 100%;
`;

const StyledHomeGrid = styled(GridContainer)`
  flex-direction: row;
`;

const Home = () => (
  <StyledHomeGrid container justify="center" align="center">
    <Grid item xs={12}>
      <LogoUTFPR />
    </Grid>
    <Grid item xs={12}>
      <Typography color="primary">
        Seja Bem-Vindo ao Painel de Controle
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography color="primary">
        dawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwafwfawf
        dawdawdawdawdwadwadwaddawwwwwwwwwwwwwwwwwwwwwwdd
      </Typography>
    </Grid>
  </StyledHomeGrid>
);

export default Home;

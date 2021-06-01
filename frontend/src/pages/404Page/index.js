import React from 'react';

import { Typography, Grid } from '@material-ui/core';
import Button from '@components/Button';
import { HOME } from '@routes';
import ErrorIcon from '@material-ui/icons/Error';
import { StyledGridContainer } from './style';

const NOTFOUND = ({ history }) => (
  <StyledGridContainer spacing={3} container justify="center" align="center">
    <Grid item xs={12}>
      <ErrorIcon style={{ fontSize: 50 }} color="primary" />
      <Typography variant="h5" color="primary" component="h5">
        404
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push(HOME)}
      >
        VOLTAR AO INICIO
      </Button>
    </Grid>
  </StyledGridContainer>
);

export default NOTFOUND;

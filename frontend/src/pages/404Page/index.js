import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Grid } from '@material-ui/core';
import Button from '@components/Button';
import { HOME } from '@routes';
import ErrorIcon from '@material-ui/icons/Error';
import { StyledGridContainer } from './style';

const NOTFOUND = ({ history }) => (
  <StyledGridContainer
    spacing={3}
    container
    justifyContent="center"
    align="center"
  >
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

NOTFOUND.defaultProps = {};

NOTFOUND.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default NOTFOUND;

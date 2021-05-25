import React from 'react';

// COMPONENTS
import GridContainer from '@components/Container';

// MATERIAL-UI COMPONENTS
import { Grid, Typography, Divider } from '@material-ui/core';

// MATERIAL-UI ICONS

const Classes = () => (
  <GridContainer container spacing={3}>
    <Grid container align="center" justify="center">
      <Typography color="primary" component="h4" variant="h4">
        Minhas Turmas
      </Typography>
    </Grid>

    <Grid item>
      <Divider />
    </Grid>
  </GridContainer>
);

export default Classes;

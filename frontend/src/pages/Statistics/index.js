import React from 'react';

// COMPONENTS
import GridContainer from '@components/Container';
import Accordion from '@components/Accordion';

// MATERIAL-UI COMPONENTS
import {
  Grid,
  Typography,
  Divider,
  // Tooltip,
} from '@material-ui/core';

const Statistics = () => (
  <GridContainer container spacing={3}>
    <Grid container align="center" justifyContent="space-between">
      <Typography color="primary" component="h4" variant="h4">
        Estatisticas
      </Typography>
    </Grid>
    <Grid item>
      <Divider />
    </Grid>
    <Grid item>
      <Accordion />
    </Grid>
  </GridContainer>
);

export default Statistics;

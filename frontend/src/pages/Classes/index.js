import React from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import GridContainer from '@components/Container';

// MATERIAL-UI COMPONENTS
import { Grid, Typography, Divider, Button } from '@mui/material';

// ROUTES
import { CREATE_CLASS } from '@routes';

const Classes = () => (
  <GridContainer container spacing={3}>
    <Grid container align="center" justifyContent="space-between">
      <Typography color="primary" component="h4" variant="h4">
        Minhas Turmas
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={CREATE_CLASS}
      >
        Criar Turma
      </Button>
    </Grid>

    <Grid item>
      <Divider />
    </Grid>
  </GridContainer>
);

export default Classes;

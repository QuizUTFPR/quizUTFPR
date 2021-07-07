import React from 'react';

// COMPONENTS
import GridContainer from '@components/Container';
import {
  Grid,
  Typography,
  // Divider,
  // Tooltip,
} from '@material-ui/core';
import TabMenu from '@components/TabMenu';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Accordion from './AccordionQuizStatistics';

const Statistics = () => {
  const TabLabels = [
    {
      icon: <PhoneIcon />,
      label: '1',
      component: <Accordion />,
    },
    {
      icon: <FavoriteIcon />,
      label: '2',
      component: 'componente 2',
    },
  ];

  return (
    <GridContainer container spacing={3}>
      <Grid container align="center" justifyContent="center">
        <Typography color="primary" component="h4" variant="h4">
          Estatisticas
        </Typography>
      </Grid>
      <Grid item>
        <TabMenu TabLabels={TabLabels} />
      </Grid>
    </GridContainer>
  );
};

export default Statistics;

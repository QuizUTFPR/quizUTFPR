import React from 'react';

// COMPONENTS
import GridContainer from '@components/Container';
import {
  Grid,
  // Tooltip,
} from '@material-ui/core';
import TabMenu from '@components/TabMenu';
import { Face, LibraryBooks } from '@material-ui/icons';

import AccordionQuizStatistics from './AccordionQuizStatistics';

// STYLES
import { TitlePage } from './style';

// API FAKE
import QuizStatistics from './questionStatistics';

const Statistics = () => {
  const { quiz } = QuizStatistics;

  const TabLabels = [
    {
      icon: <LibraryBooks />,
      label: 'ANÁLISE POR QUESTÕES',
      component: <AccordionQuizStatistics quizData={QuizStatistics} />,
    },
    {
      icon: <Face />,
      label: 'ANÁLISE POR ALUNOS',
      component: 'componente 2',
    },
  ];

  return (
    <GridContainer container spacing={3}>
      <Grid container align="center" justifyContent="center">
        <TitlePage color="primary" component="p" variant="h4">
          Estatisticas - {quiz.title}
        </TitlePage>
      </Grid>
      <Grid item>
        <TabMenu TabLabels={TabLabels} />
      </Grid>
    </GridContainer>
  );
};

export default Statistics;

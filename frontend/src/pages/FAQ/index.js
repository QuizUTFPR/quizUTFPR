import React from 'react';

// COMPONENTS
import GridContainer from '@components/Container';
import { Grid } from '@mui/material';
import TabMenu from '@components/TabMenu';
import {
  School,
  LibraryBooks,
  Quiz,
  Leaderboard,
  BarChart,
} from '@mui/icons-material';

// STYLES
import { TitlePage, TitleWrapper } from './style';

// PAGES
import ClassFAQ from './ClassFAQ';
import QuizFAQ from './QuizFAQ';
import QuestionFAQ from './QuestionFAQ';
import ClassStatisticsFAQ from './ClassStatisticsFAQ';
import QuizStatisticsFAQ from './QuizStatisticsFAQ';

const FAQ = () => {
  const TabLabels = [
    {
      icon: <School />,
      label: 'TURMAS',
      component: <ClassFAQ />,
    },
    {
      icon: <LibraryBooks />,
      label: 'QUIZ',
      component: <QuizFAQ />,
    },
    {
      icon: <Quiz />,
      label: 'QUESTÕES',
      component: <QuestionFAQ />,
    },
    {
      icon: <Leaderboard />,
      label: 'ESTATÍSTICAS DA TURMA',
      component: <ClassStatisticsFAQ />,
    },
    {
      icon: <BarChart />,
      label: 'ESTATÍSTICAS DO QUIZ',
      component: <QuizStatisticsFAQ />,
    },
  ];

  return (
    <GridContainer container spacing={3}>
      <Grid
        container
        align="center"
        justifyContent="center"
        style={{ width: '100%' }}
      >
        <TitleWrapper>
          <TitlePage color="primary" component="p" variant="h4">
            Dúvidas Frequentes
          </TitlePage>
        </TitleWrapper>
      </Grid>

      <Grid item>
        <TabMenu TabLabels={TabLabels} />
      </Grid>
    </GridContainer>
  );
};

export default FAQ;

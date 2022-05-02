import React from 'react';

// COMPONENTS
import GridContainer from '@components/Container';
import { Grid } from '@mui/material';
import TabMenu from '@components/TabMenu';
import { Face, LibraryBooks } from '@mui/icons-material';

// STYLES
import { TitlePage, TitleWrapper } from './style';

// PAGES
import QuizFAQ from './QuizFAQ';
import QuestionFAQ from './QuestionFAQ';
import StatisticsFAQ from './StatisticsFAQ';

const FAQ = () => {
  const TabLabels = [
    {
      icon: <LibraryBooks />,
      label: 'QUIZ',
      component: <QuizFAQ />,
    },
    {
      icon: <Face />,
      label: 'QUESTÕES',
      component: <QuestionFAQ />,
    },
    {
      icon: <Face />,
      label: 'ESTATÍSTICAS',
      component: <StatisticsFAQ />,
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
            FAQ
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

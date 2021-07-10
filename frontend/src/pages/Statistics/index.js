import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '@api';

// COMPONENTS
import GridContainer from '@components/Container';
import {
  Grid,
  // Tooltip,
} from '@material-ui/core';
import TabMenu from '@components/TabMenu';
import { Face, LibraryBooks } from '@material-ui/icons';

import AccordionQuizStatistics from './AccordionQuizStatistics';
import AccordionStudentQuizStatistics from './AccordionStudentQuizStatistics';

// STYLES
import { TitlePage } from './style';

const Statistics = () => {
  const [questionQuiz, setQuestionQuiz] = useState(false);
  const [studentQuiz, setStudentQuiz] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data: studentQuizStatistics } = await api.post(
        '/statistics/getStudentQuizStatistics',
        {
          quiz_id: id,
        }
      );
      setStudentQuiz(studentQuizStatistics);

      const { data: questionQuizStatistics } = await api.post(
        '/statistics/getQuestionQuizStatistics',
        {
          quiz_id: id,
        }
      );

      setQuestionQuiz(questionQuizStatistics);
      // setQuestionQuiz(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const TabLabels = [
    {
      icon: <LibraryBooks />,
      label: 'ANÁLISE POR QUESTÕES',
      component: <AccordionQuizStatistics quizData={questionQuiz} />,
    },
    {
      icon: <Face />,
      label: 'ANÁLISE POR ALUNOS',
      component: <AccordionStudentQuizStatistics quizData={studentQuiz} />,
    },
  ];

  return (
    <GridContainer container spacing={3}>
      <Grid container align="center" justifyContent="center">
        <TitlePage color="primary" component="p" variant="h4">
          Estatisticas - {questionQuiz && questionQuiz.quiz.title}
        </TitlePage>
      </Grid>
      <Grid item>
        {questionQuiz && studentQuiz && <TabMenu TabLabels={TabLabels} />}
      </Grid>
    </GridContainer>
  );
};

export default Statistics;

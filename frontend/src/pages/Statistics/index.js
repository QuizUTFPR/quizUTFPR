import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '@api';

// COMPONENTS
import GridContainer from '@components/Container';
import { Grid, TextField, MenuItem } from '@mui/material';
import TabMenu from '@components/TabMenu';
import { Face, LibraryBooks } from '@mui/icons-material';

import AccordionQuizStatistics from './AccordionQuizStatistics';
import AccordionStudentQuizStatistics from './AccordionStudentQuizStatistics';

// STYLES
import { TitlePage } from './style';

const Statistics = () => {
  const { id } = useParams();
  const { state: stateRoute } = useLocation();

  const [questionQuiz, setQuestionQuiz] = useState(false);
  const [studentQuiz, setStudentQuiz] = useState(false);
  const [quizPin, setQuizPin] = useState();
  const [teacherClasses, setTeacherClasses] = useState([]);

  const handleGetTeacherClasses = async () => {
    try {
      const { data } = await api.get('/class/getAllTeacherClasses');

      setTeacherClasses(data);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const handleGetStatistics = async (classId) => {
    try {
      const { data: studentQuizStatistics } = await api.post(
        '/statistics/getStudentQuizStatistics',
        {
          quizId: id,
          classId,
          orderBy: 'worst',
        }
      );
      setStudentQuiz(studentQuizStatistics);

      const { data: questionQuizStatistics } = await api.post(
        '/statistics/getQuestionQuizStatistics',
        {
          quizId: id,
        }
      );

      setQuestionQuiz(questionQuizStatistics);
      setQuizPin(questionQuizStatistics.quiz.pin);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const fetchData = async () => {
    try {
      const { data: studentQuizStatistics } = await api.post(
        '/statistics/getStudentQuizStatistics',
        {
          quizId: id,
        }
      );
      setStudentQuiz(studentQuizStatistics);

      const { data: questionQuizStatistics } = await api.post(
        '/statistics/getQuestionQuizStatistics',
        {
          quizId: id,
        }
      );

      setQuestionQuiz(questionQuizStatistics);
      setQuizPin(questionQuizStatistics.quiz.pin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    handleGetTeacherClasses();

    console.log('stateRoute', stateRoute);

    return () => setTeacherClasses([]);
  }, []);

  const TabLabels = [
    {
      icon: <LibraryBooks />,
      label: 'ANÁLISE POR QUESTÕES',
      component: (
        <AccordionQuizStatistics
          quizData={questionQuiz}
          pin={quizPin}
          quizId={id}
        />
      ),
    },
    {
      icon: <Face />,
      label: 'ANÁLISE POR ALUNOS',
      component: (
        <AccordionStudentQuizStatistics
          quizData={studentQuiz}
          pin={quizPin}
          quizId={id}
        />
      ),
    },
  ];

  return (
    <GridContainer container spacing={3}>
      <Grid container align="center" justifyContent="center">
        <TitlePage color="primary" component="p" variant="h4">
          Estatisticas - {questionQuiz && questionQuiz.quiz.title}
        </TitlePage>

        <TextField
          style={{ width: '100%' }}
          label="Turmas"
          id="turmas"
          name="turmas"
          variant="outlined"
          onChange={(event) => {
            const arg =
              event.target.value === 'all' ? null : event.target.value;
            handleGetStatistics(arg);
          }}
          defaultValue={stateRoute?.idClass || 'all'}
          required
          select
        >
          <MenuItem value="all">Todos</MenuItem>
          {teacherClasses.map((teacherClass) => (
            <MenuItem value={teacherClass.id} key={teacherClass.id}>
              {teacherClass.title}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item>
        {/* {questionQuiz && studentQuiz && <TabMenu TabLabels={TabLabels} />} */}
        {studentQuiz && <TabMenu TabLabels={TabLabels} />}
      </Grid>
    </GridContainer>
  );
};

export default Statistics;

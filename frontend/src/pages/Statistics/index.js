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
import { TitlePage, ContainerSelect, TitleWrapper } from './style';

const Statistics = () => {
  const { id } = useParams();
  const { state: stateRoute } = useLocation();

  const [questionQuiz, setQuestionQuiz] = useState(false);
  const [studentQuiz, setStudentQuiz] = useState(false);
  const [quizPin, setQuizPin] = useState();
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [filterData, setFilterData] = useState({
    classId: null,
    orderBy: 'best',
  });

  const handleGetTeacherClasses = async () => {
    try {
      const { data } = await api.get('/class/getAllTeacherClasses');

      setTeacherClasses([...data.private, ...data.public]);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const handleGetStatistics = async () => {
    try {
      const { data: studentQuizStatistics } = await api.post(
        '/statistics/getStudentQuizStatistics',
        {
          quizId: id,
          classId: filterData.classId,
          orderBy: filterData.orderBy,
        }
      );
      setStudentQuiz(studentQuizStatistics);

      const { data: questionQuizStatistics } = await api.post(
        '/statistics/getQuestionQuizStatistics',
        {
          quizId: id,
          classId: filterData.classId,
          orderBy: filterData.orderBy,
        }
      );

      setQuestionQuiz(questionQuizStatistics);
      setQuizPin(questionQuizStatistics.quiz.pin);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  useEffect(() => {
    handleGetStatistics();
  }, [filterData]);

  useEffect(() => {
    handleGetTeacherClasses();

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
      <Grid
        container
        align="center"
        justifyContent="center"
        style={{ width: '100%' }}
      >
        <TitleWrapper>
          <TitlePage color="primary" component="p" variant="h4">
            Estatísticas - {questionQuiz && questionQuiz.quiz.title}
          </TitlePage>
        </TitleWrapper>
      </Grid>

      {/* CLASS FILTER */}
      <ContainerSelect>
        <TextField
          style={{ width: '100%' }}
          label="Turmas"
          id="turmas"
          name="turmas"
          variant="outlined"
          onChange={(event) => {
            const arg =
              event.target.value === 'all' ? null : event.target.value;
            setFilterData((prevState) => ({
              ...prevState,
              classId: arg,
            }));
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

        {/* ATTEMPT FILTER */}
        <TextField
          style={{ width: '100%' }}
          label="Tentativa"
          id="tentativas"
          name="tentativa"
          variant="outlined"
          onChange={(event) => {
            setFilterData((prevState) => ({
              ...prevState,
              orderBy: event.target.value,
            }));
          }}
          defaultValue="best"
          required
          select
        >
          <MenuItem value="best">Melhor Tentativa</MenuItem>
          <MenuItem value="worst">Pior Tentativa</MenuItem>
          <MenuItem value="first">Primeira Tentativa</MenuItem>
        </TextField>
      </ContainerSelect>
      <Grid item>
        {/* {questionQuiz && studentQuiz && <TabMenu TabLabels={TabLabels} />} */}
        {studentQuiz && <TabMenu TabLabels={TabLabels} />}
      </Grid>
    </GridContainer>
  );
};

export default Statistics;

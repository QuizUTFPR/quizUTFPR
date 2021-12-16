import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';

// import PropTypes from 'prop-types'

// ROUTES
import {
  HOME,
  QUIZ,
  CREATE_QUIZ,
  CLASSES,
  STATISTICS_QUIZ,
  CREATE_CLASS,
} from '@routes';

// COMPONENTS
const Menu = lazy(() => import('@components/MenuDrawer'));

// PAGES
const Home = lazy(() => import('../Home'));
const Quiz = lazy(() => import('../MyQuizzes'));
const CreateQuiz = lazy(() => import('../CreateQuiz'));
const Classes = lazy(() => import('../Classes'));
const Statistics = lazy(() => import('../Statistics'));
const CreateClass = lazy(() => import('../CreateClass'));

const Div = styled.div`
  display: flex;
`;

const MainPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <Div>
      <Menu />
      <Routes>
        <Route path={HOME} element={<Home />} exact />
        <Route path={QUIZ} element={<Quiz />} exact />
        <Route path={CREATE_QUIZ} element={<CreateQuiz />} exact />
        <Route path={CREATE_CLASS} element={<CreateClass />} exact />
        <Route path={CLASSES} element={<Classes />} exact />
        <Route path={`${STATISTICS_QUIZ}/:id`} element={<Statistics />} exact />
      </Routes>
    </Div>
  </Suspense>
);

export default MainPage;

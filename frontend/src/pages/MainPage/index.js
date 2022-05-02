import React, { lazy, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import {
  HOME,
  QUIZ,
  CREATE_QUIZ,
  CLASSES,
  STATISTICS_QUIZ,
  CREATE_CLASS,
  FAQ,
} from '@routes';

// Styles
import { GlobalWrapper, ContentWrapper } from './style';

// ROUTES

// COMPONENTS
const Menu = lazy(() => import('@components/MenuDrawer'));

// PAGES
const Home = lazy(() => import('../Home'));
const Quiz = lazy(() => import('../Quizzes'));
const CreateQuiz = lazy(() => import('../Quizzes/CreateQuiz'));
const Classes = lazy(() => import('../Classes'));
const Statistics = lazy(() => import('../Statistics'));
const CreateClass = lazy(() => import('../Classes/CreateClass'));
const FaqPage = lazy(() => import('../FAQ'));

const MainPage = () => (
  <Suspense fallback={<LinearProgress />}>
    <GlobalWrapper>
      <Menu />
      <ContentWrapper>
        <Routes>
          <Route path={HOME} element={<Home />} exact />
          <Route path={QUIZ} element={<Quiz />} exact />
          <Route path={CREATE_QUIZ} element={<CreateQuiz />} exact />
          <Route path={CREATE_CLASS} element={<CreateClass />} exact />
          <Route path={CLASSES} element={<Classes />} exact />
          <Route path={FAQ} element={<FaqPage />} exact />
          <Route
            path={`${STATISTICS_QUIZ}/:id`}
            element={<Statistics />}
            exact
          />
        </Routes>
      </ContentWrapper>
    </GlobalWrapper>
  </Suspense>
);

export default MainPage;

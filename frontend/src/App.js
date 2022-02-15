import React, { lazy, Suspense, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// CONTEXT
import QuestionQuizProvider from '@context/questionsQuiz';

// HOOKS
import useAuth from '@hooks/Auth';

// ROUTES
import { LOGIN, QUESTION, HOME, TOKENEXPIRED, CLASSES } from '@routes';

// PAGES
const MainPage = lazy(() => import('./pages/MainPage'));
const Login = lazy(() => import('./pages/Login'));
const ManageQuiz = lazy(() => import('./pages/Quizzes/ManageQuiz'));
const ExpiredToken = lazy(() => import('./pages/ConfirmExpireOfToken'));
const ManageClass = lazy(() => import('./pages/Classes/ManageClass'));

const App = () => {
  const location = useLocation();
  const [checkedToken, setCheckedToken] = useState(false);
  const {
    teacherInfo,
    setTeacherInfo,
    // logout
  } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    const teacher = localStorage.getItem('@TEACHER');

    if (token && teacher) {
      setTeacherInfo({
        token,
        teacher: JSON.parse(teacher),
      });
    }
    setCheckedToken(true);
  }, []);
  if (!checkedToken) {
    return <LinearProgress />;
  }

  if (teacherInfo.token && location.pathname === LOGIN) {
    return <Navigate to={HOME} />;
  }

  if (
    !teacherInfo.token &&
    location.pathname !== LOGIN &&
    location.pathname !== TOKENEXPIRED
  ) {
    return <Navigate to={LOGIN} />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path={TOKENEXPIRED} exact element={<ExpiredToken />} />
        <Route path={LOGIN} exact element={<Login />} />

        <Route
          path={`${QUESTION}:idQuiz`}
          exact
          element={
            <QuestionQuizProvider>
              <ManageQuiz />
            </QuestionQuizProvider>
          }
        />
        <Route path={`${CLASSES}/:idClass`} exact element={<ManageClass />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

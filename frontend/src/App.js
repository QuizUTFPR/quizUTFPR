import React, { lazy, Suspense, useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types'

// CONTEXT
import QuestionQuizProvider from '@context/questions_quiz';

// HOOKS
import useAuth from '@hooks/Auth';

// ROUTES
import { LOGIN, QUESTION, HOME } from '@routes';

// PAGES
const MainPage = lazy(() => import('./pages/MainPage'));
const Login = lazy(() => import('./pages/Login'));
const Question = lazy(() => import('./pages/Question'));

function App({ location }) {
  const [checkedToken, setCheckedToken] = useState(false);
  const { teacherInfo, setTeacherInfo } = useAuth();

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

  if (!checkedToken) return <LinearProgress />;

  if (teacherInfo.token && location.pathname === LOGIN) {
    return <Redirect to={HOME} />;
  }

  if (!teacherInfo.token && location.pathname !== LOGIN) {
    return <Redirect to={LOGIN} />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route
          path={`${QUESTION}:id_quiz`}
          exact
          render={(props) => (
            <QuestionQuizProvider>
              <Question {...props} />
            </QuestionQuizProvider>
          )}
        />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  );
}

export default App;

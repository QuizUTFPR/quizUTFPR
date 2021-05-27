import React, { lazy, Suspense, useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
// import PropTypes from 'prop-types'

// CONTEXT
import QuestionQuizProvider from '@context/questions_quiz';

// HOOKS
import useAuth from '@hooks/Auth';

// ROUTES
import { LOGIN, QUESTION, HOME, TOKENEXPIRED } from '@routes';

// PAGES
const MainPage = lazy(() => import('./pages/MainPage'));
const Login = lazy(() => import('./pages/Login'));
const Question = lazy(() => import('./pages/Question'));
const ExpiredToken = lazy(() => import('./pages/ConfirmExpireOfToken'));

function App({ location, history }) {
  const [checkedToken, setCheckedToken] = useState(false);
  const { teacherInfo, setTeacherInfo, logout } = useAuth();

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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (teacherInfo.token) {
      const { token } = teacherInfo;
      const { payload } = jwt.decode(token, { complete: true });
      const dateNow = new Date();

      if (payload.exp < dateNow.getTime() / 1000) {
        logout();
        history.push(TOKENEXPIRED);
      }
    }
  });

  if (!checkedToken) return <LinearProgress />;

  if (teacherInfo.token && location.pathname === LOGIN) {
    return <Redirect to={HOME} />;
  }

  if (
    !teacherInfo.token &&
    location.pathname !== LOGIN &&
    location.pathname !== TOKENEXPIRED
  ) {
    return <Redirect to={LOGIN} />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={TOKENEXPIRED} exact component={ExpiredToken} />
        <Route path={LOGIN} exact component={Login} />
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

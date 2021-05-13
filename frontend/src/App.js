import React, { lazy, Suspense } from "react";
import { LinearProgress } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
// import PropTypes from 'prop-types'

// CONTEXT
import QuestionQuizProvider from "@context/questions_quiz";

//HOOKS
import useAuth from "@hooks/Auth";

// ROUTES
import { LOGIN, QUESTION } from "@routes";

// PAGES
const MainPage = lazy(() => import("./pages/MainPage"));
const Login = lazy(() => import("./pages/Login"));
const Question = lazy(() => import("./pages/Question"));

function App() {
  const auth = useAuth();

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route
          path={QUESTION}
          exact
          render={props => (
            <QuestionQuizProvider>
              {" "}
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

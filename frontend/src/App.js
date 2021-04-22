import React, { lazy, Suspense} from 'react'
import styled from 'styled-components'
import { LinearProgress } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
// import PropTypes from 'prop-types'

// ROUTES
import {
  HOME,
  QUIZ,
  CREATE_QUIZ,
  CLASSES
} from '@routes';

// COMPONENTS
const Menu = lazy(() => import('./components/MenuDrawer'));

// PAGES
const Home = lazy(() => import('./pages/Home'));
const Quiz = lazy(() => import('./pages/MyQuizzes'));
const CreateQuiz = lazy(() => import ('./pages/CreateQuiz'));
const Classes = lazy(() => import('./pages/Classes'));

const Div = styled.div`
  display: flex;
`


function App() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Div>
      <Menu />
      <Switch>
        <Route path={HOME} component={Home} exact />
        <Route path={QUIZ} component={Quiz} exact />
        <Route path={CREATE_QUIZ} component={CreateQuiz}  />
        <Route path={CLASSES} component={Classes} />
      </Switch>
      </Div>
    </Suspense>
  );
}

export default App;

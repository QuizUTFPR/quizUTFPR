import React, { lazy, Suspense} from 'react'
import styled from 'styled-components'
import { LinearProgress } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
// import PropTypes from 'prop-types'

// ROUTES
import {
  HOME,
  QUIZZES
} from '@routes';

// COMPONENTS
const Menu = lazy(() => import('./components/MenuDrawer'));

// PAGES
const Home = lazy(() => import('./pages/Home'));
const Quizzes = lazy(() => import('./pages/Quizzes'));

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
        <Route path={QUIZZES} component={Quizzes} exact />
      </Switch>
      </Div>
    </Suspense>
  );
}

export default App;

import React, { lazy, Suspense} from 'react'
import { LinearProgress } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
// import PropTypes from 'prop-types'

// ROUTES
import {HOME, LOGIN} from "@routes"

// PAGES
const Login = lazy(() => import('./pages/Login'));
const Main = lazy(() => import('./pages/Main'));


function App() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route component={Main} />
      </Switch>
    </Suspense>
  );
}

export default App;

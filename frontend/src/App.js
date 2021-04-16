import React, { lazy, Suspense} from 'react'
import { LinearProgress } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
// import PropTypes from 'prop-types'

// ROUTES
import {HOME} from "@routes"

// PAGES
const Login = lazy(() => import('./pages/Login'));


function App() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={HOME} component={Login} />
        {/* <Route component={MainPage} /> */}
      </Switch>
    </Suspense>
  );
}

export default App;

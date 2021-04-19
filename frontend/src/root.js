import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core'

import GlobalStyle from './theme/globalStyle';

// ROUTES
import {LOGIN} from "@routes"

// PAGES
const Login = lazy(() => import('./pages/Login'));
const App = lazy(() => import('./App'));


const theme = createMuiTheme({
  typography: {
    useNextVarients: true
  },
  palette:{
    primary: {
      main: '#2B2E4A'
    }
  }
});

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <Suspense fallback={<p>Carregando...</p>}>
          <Switch>
            <Route path={LOGIN} exact component={Login} />
            <Route component={App} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}


export default Root;
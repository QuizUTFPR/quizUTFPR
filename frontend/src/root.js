import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline, createMuiTheme, MuiThemeProvider, LinearProgress } from '@material-ui/core'
import {ThemeProvider} from 'styled-components'

import GlobalStyle from './theme/globalStyle';

//CONTEXT
import QuestionQuizProvider from '@context/questions_quiz'

// ROUTES
import {
  LOGIN,
  QUESTION
} from "@routes"

// PAGES
const Login = lazy(() => import('./pages/Login'));
const App = lazy(() => import('./App'));
const Question = lazy(() => import('./pages/Question'));

const theme = createMuiTheme({
  typography: {
    useNextVarients: true
  },
  palette:{
    primary: {
      main: '#2B2E4A'
    },
    background: {
      bgWebSite: '#F4F5F9',
      bgContainer: 'white'
    }
  }
});

function Root() {
  
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path={LOGIN} exact component={Login} />
            <Route path={QUESTION} exact render={ (props)=> (
              <QuestionQuizProvider> <Question {...props} /></QuestionQuizProvider>
            )} />
            <Route component={App} />
          </Switch>
        </Suspense>
      </BrowserRouter>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}


export default Root;
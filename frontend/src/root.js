import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import AuthProvider from '@context/auth';
import App from './App';

import GlobalStyle from './theme/globalStyle';
import theme from './theme/theme';

// CONTEXT

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route component={App} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default Root;

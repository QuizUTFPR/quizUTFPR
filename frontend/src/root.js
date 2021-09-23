import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import AuthProvider from '@context/auth';
import { MathJaxContext } from 'better-react-mathjax';
import configMathJax from './config/mathJax';

import App from './App';

import GlobalStyle from './theme/globalStyle';
import theme from './theme/theme';

// CONTEXT

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <AuthProvider>
          <MathJaxContext
            version={3}
            config={configMathJax}
            onTypeset={(teste) => console.log(teste)}
            onInitTypeset={(teste) => console.log(teste)}
          >
            <BrowserRouter>
              <Switch>
                <Route exact component={App} />
              </Switch>
            </BrowserRouter>
          </MathJaxContext>
        </AuthProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default Root;

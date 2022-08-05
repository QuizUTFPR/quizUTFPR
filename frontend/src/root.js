import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import AuthProvider from '@context/auth';

import App from './App';

import GlobalStyle from './theme/globalStyle';
import theme from './theme/theme';

// CONTEXT

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default Root;

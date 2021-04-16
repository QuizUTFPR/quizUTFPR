import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import App from './App'

import GlobalStyle from './theme/globalStyle';


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
        <Switch>
          <Route component={App} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}


export default Root;
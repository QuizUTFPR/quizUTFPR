import {createMuiTheme } from '@material-ui/core'

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

export default theme;
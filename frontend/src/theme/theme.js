import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVarients: true,
  },
  palette: {
    primary: {
      main: '#2C2E35',
    },
    background: {
      bgWebSite: '#F4F5F9',
      bgContainer: 'white',
    },
  },
});

export default theme;

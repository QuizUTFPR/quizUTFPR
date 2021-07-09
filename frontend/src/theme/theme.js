import { createTheme } from '@material-ui/core';

const theme = createTheme({
  typography: {
    useNextVarients: true,
  },
  palette: {
    primary: {
      main: '#2C2E35',
    },
    secondary: {
      main: '#116FBF',
    },
    yellow: {
      main: '#FFC935',
    },
    background: {
      bgWebSite: '#F4F5F9',
      bgContainer: 'white',
    },
  },
});

export default theme;

/* eslint-disable global-require */
import React from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components';
import Routes from './src/routes';
import theme from './src/styles/theme';

const App = () => {
  const [loaded] = useFonts({
    RobotoBlack: require('./assets/fonts/Roboto-Black.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
    RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
    RobotoThin: require('./assets/fonts/Roboto-Thin.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;

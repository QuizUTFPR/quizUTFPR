/* eslint-disable global-require */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components';
import Routes from './src/routes';
import theme from './src/styles/theme';

const App = () => {
  // const [loaded] = useFonts({
  //   RobotoBlack: require('./assets/fonts/Roboto-Black.ttf'),
  //   RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
  //   RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
  //   RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
  //   RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  //   RobotoThin: require('./assets/fonts/Roboto-Thin.ttf'),
  // });

  const [loaded] = useFonts({
    PoppinsBlack: require('./assets/fonts/Poppins/Poppins-Black.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    PoppinsExtraBold: require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Routes />
    </ThemeProvider>
  );
};

export default App;

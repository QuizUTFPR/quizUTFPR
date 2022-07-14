/* eslint-disable react/style-prop-object */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components';
import StudentAuthProvider from '@context/Student/auth';
import { LogBox } from 'react-native';
import Routes from './src/routes';
import theme from './src/styles/theme';

if (__DEV__) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('react-devtools');
}

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        PoppinsBlack: require('./assets/fonts/Poppins/Poppins-Black.ttf'),
        PoppinsBold: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
        PoppinsExtraBold: require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
        PoppinsMedium: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
        PoppinsRegular: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
      });
      setLoaded(true);
    };

    loadFonts();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor="transparent" translucent />
      <StudentAuthProvider>
        <Routes />
      </StudentAuthProvider>
    </ThemeProvider>
  );
};

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default App;

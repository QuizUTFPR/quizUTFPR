/* eslint-disable global-require */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Routes from './src/routes';
import theme from './src/styles/theme';

export default function Main() {
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
    <PaperProvider
      settings={{
        icon: (props) => <AntDesign {...props} />,
      }}
      theme={theme}
    >
      <Routes />
    </PaperProvider>
  );
}

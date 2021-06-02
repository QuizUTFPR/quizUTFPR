import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Routes from './src/routes';
import theme from './src/styles/theme';

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

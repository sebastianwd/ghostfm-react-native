/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';

const theme = {
  ...DarkTheme,
  mode: 'exact',
  colors: {
    ...DarkTheme.colors,
    primary: '#3f51b5',
    accent: 'tomato',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

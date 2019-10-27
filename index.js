/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import TrackPlayer from 'react-native-track-player';

import {StoreProvider} from 'easy-peasy';
import store from './components/misc/store/store';

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
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => require('./service'));

/**
 * @format
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import React from "react";
import {
  Provider as PaperProvider,
  DarkTheme,
  configureFonts
} from "react-native-paper";
import TrackPlayer from "react-native-track-player";
import { StoreProvider } from "easy-peasy";
import store from "./components/misc/store/store";

const fontConfig = {
  default: {
    regular: {
      fontFamily: "CircularStd-Book",
      fontWeight: "normal"
    },
    medium: {
      fontFamily: "CircularStd-Medium",
      fontWeight: "normal"
    },
    light: {
      fontFamily: "CircularStd-Book",
      fontWeight: "normal"
    },
    thin: {
      fontFamily: "CircularStd-Book",
      fontWeight: "normal"
    }
  }
};

const theme = {
  ...DarkTheme,
  fonts: configureFonts(fontConfig),
  mode: "exact",
  colors: {
    ...DarkTheme.colors,
    primary: "#1d1d1d",
    accent: "tomato"
  }
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
TrackPlayer.registerPlaybackService(() => require("./service"));

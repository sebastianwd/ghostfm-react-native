import React, { useState } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import HomeScreen from "../screens/HomeScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import AlbumsScreen from "../screens/AlbumsScreen";
import { StyleSheet, Dimensions } from "react-native";
import { withTheme } from "react-native-paper";

const TopNav = props => {
  /* Theme */
  const { colors } = props.theme;

  const [routes, setRoutes] = useState({
    index: 0,
    routes: [
      { key: "playlist", title: "Playlists" },
      { key: "albums", title: "Albums" }
    ]
  });

  const handleIndexChange = index => {
    setRoutes(routes => ({
      ...routes,
      index: index
    }));
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{ backgroundColor: colors.accent }}
      style={{ backgroundColor: colors.primary }}
      labelStyle={styles.label}
      tabStyle={styles.tabStyle}
    />
  );

  return (
    <TabView
      navigationState={routes}
      renderScene={SceneMap({
        playlist: PlaylistScreen,
        albums: AlbumsScreen
      })}
      lazy={true}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      initialLayout={{
        height: 0,
        width: Dimensions.get("window").width
      }}
      style={styles.flex1}
    />
  );
};
const styles = StyleSheet.create({
  label: {
    fontWeight: "400",
    textTransform: "capitalize"
  },
  tabStyle: {
    width: "auto"
  }
});

export default withTheme(TopNav);

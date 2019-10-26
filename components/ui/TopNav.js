import React, {useState} from 'react';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import HomeScreen from '../screens/HomeScreen';
import ArtistScreen from '../screens/ArtistScreen';
import {StyleSheet, Dimensions} from 'react-native';
import {withTheme} from 'react-native-paper';

const TopNav = props => {
  /* Theme */
  const {colors} = props.theme;

  const [routes, setRoutes] = useState({
    index: 0,
    routes: [{key: 'home', title: 'Home'}],
  });

  const handleIndexChange = index => {
    setRoutes(routes => ({
      ...routes,
      index: index,
    }));
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      labelStyle={styles.label}
      tabStyle={styles.tabStyle}
    />
  );

  const styles = StyleSheet.create({
    tabbar: {
      backgroundColor: colors.primary,
    },
    indicator: {
      backgroundColor: colors.accent,
    },
    label: {
      fontWeight: '400',
      textTransform: 'capitalize',
    },
    tabStyle: {
      width: 'auto',
    },
  });

  return (
    <TabView
      navigationState={routes}
      renderScene={SceneMap({
        home: HomeScreen,
      })}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      initialLayout={{width: Dimensions.get('window').width}}
    />
  );
};

export default withTheme(TopNav);

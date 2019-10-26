import {BottomNavigation, Text} from 'react-native-paper';
import React, {useState} from 'react';
import HomeScreen from '../screens/HomeScreen';
import ArtistScreen from '../screens/ArtistScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import {createNavigator} from 'react-navigation';

const BottomNav = () => {
  const [routes, setRoutes] = useState({
    index: 0,
    routes: [
      {key: 'home', title: 'Home', icon: 'home'},
      {key: 'search', title: 'Search', icon: 'magnify'},
      {key: 'library', title: 'Library', icon: 'library-music'},
    ],
  });
  const handleIndexChange = index => {
    setRoutes(routes => ({
      ...routes,
      index: index,
    }));
  };

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    search: SearchScreen,
    library: LibraryScreen,
  });

  return (
    <BottomNavigation
      navigationState={routes}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;

import React from 'react';

import MainLayout from './components/MainLayout';
import ArtistScreen from './components/screens/ArtistScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './components/misc/NavigationService';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import HomeScreen from './components/screens/HomeScreen';
import LibraryScreen from './components/screens/LibraryScreen';
import SearchScreen from './components/screens/SearchScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

/* home: HomeScreen,
    search: SearchScreen,
    library: LibraryScreen,*/
const BottomNavStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <MaterialIcon
            name={'home'}
            size={24}
            color={`${focused ? '#fff' : '#d1d1d1b7'}`}
          />
        ),
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <MaterialIcon
            name={'magnify'}
            size={24}
            color={`${focused ? '#fff' : '#d1d1d1b7'}`}
          />
        ),
      },
    },
    Library: {
      screen: LibraryScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <MaterialIcon
            name={'library-music'}
            size={24}
            color={`${focused ? '#fff' : '#d1d1d1b7'}`}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const MainStack = createStackNavigator(
  {
    Main: {
      screen: BottomNavStack,
      navigationOptions: {
        header: null, //this will hide the header
      },
    },
    Artist: {
      screen: ArtistScreen,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(MainStack);

class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default App;

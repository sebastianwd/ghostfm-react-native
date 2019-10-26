import React from 'react';

import MainLayout from './components/MainLayout';
import ArtistScreen from './components/screens/ArtistScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './components/misc/NavigationService';

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainLayout,
      navigationOptions: {
        title: 'Home',
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

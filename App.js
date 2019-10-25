import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
});

const App = createAppContainer(MainNavigator);

export default App;

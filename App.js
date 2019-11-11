import React from "react";

import ArtistScreen from "./components/screens/ArtistScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import NavigationService from "./components/misc/NavigationService";
import HomeScreen from "./components/screens/HomeScreen";
import PlayerScreen from "./components/screens/components/Player/PlayerScreen";
import LibraryScreen from "./components/screens/LibraryScreen";
import SearchScreen from "./components/screens/SearchScreen";
import AlbumTracksScreen from "./components/screens/AlbumTracksScreen";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import BottomNav from "./components/ui/BottomNav";

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        header: null //this will hide the header
      }
    },
    Artist: {
      screen: ArtistScreen
    },
    AlbumTracks: {
      screen: AlbumTracksScreen
    }
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#26263d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const BottomNavStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"home"}
            size={24}
            color={`${focused ? "#fff" : "#d1d1d1b7"}`}
          />
        )
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"magnify"}
            size={24}
            color={`${focused ? "#fff" : "#d1d1d1b7"}`}
          />
        )
      }
    },
    Library: {
      screen: LibraryScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"library-music"}
            size={24}
            color={`${focused ? "#fff" : "#d1d1d1b7"}`}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarComponent: props => <BottomNav {...props} />,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#26263d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const MainStack = createStackNavigator(
  {
    Main: {
      screen: BottomNavStack,
      navigationOptions: {
        header: null //this will hide the header
      }
    },
    Player: {
      screen: PlayerScreen,
      navigationOptions: {
        header: null //this will hide the header
      }
    }
  },
  {
    initialRouteName: "Main"
  }
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

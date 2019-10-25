import {BottomNavigation, Text} from 'react-native-paper';
import React from 'react';

export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'music', title: 'Music', icon: 'queue-music'},
      {key: 'albums', title: 'Albums', icon: 'album'},
      {key: 'recents', title: 'Recents', icon: 'history'},
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}

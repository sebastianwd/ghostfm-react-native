import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import TrackPlayer from 'react-native-track-player';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import {Text} from 'react-native-paper';

const Player = props => {
  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  };
  return (
    <View style={props.style}>
      <Text>player</Text>
    </View>
  );
};

export default Player;

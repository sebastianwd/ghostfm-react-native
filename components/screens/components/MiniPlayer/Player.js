import React, {useEffect, memo} from 'react';
import PropTypes from 'prop-types';
import TrackPlayer from 'react-native-track-player';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';

import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Text} from 'react-native-paper';
import {useStore} from 'easy-peasy';
import useMusicPlayer from '../../../misc/hooks/useMusicPlayer';

const MiniPlayer = memo(({onPress}) => {
  //const progress = useProgress(1000);

  const {playerState, isPlaying, handlePlayPause} = useMusicPlayer();

  console.log('updating');
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
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <MaterialIcon name={'heart'} size={24} color={'#fff'} />
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text numberOfLines={1} style={styles.trackTitle}>
            {playerState.current.title}
          </Text>
          <Text numberOfLines={1} style={styles.artistName}>
            {playerState.current.artist}
          </Text>
        </View>
        <MaterialIcon
          style={{marginRight: '5%'}}
          name={isPlaying ? 'pause' : 'play'}
          size={32}
          color={'#fff'}
          onPress={handlePlayPause}
        />
        <Icon name="chevron-up" color="white" size={24} onPress={onPress} />
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 68,
    backgroundColor: '#272829',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  trackTitle: {maxWidth: '80%'},
  artistName: {fontSize: 12, marginTop: 1},
});

export default MiniPlayer;

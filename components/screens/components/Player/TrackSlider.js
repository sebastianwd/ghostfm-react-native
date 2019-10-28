import Slider from '@react-native-community/slider';
import {State} from 'react-native-track-player';
import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/index';
import React from 'react';
import {StyleSheet} from 'react-native';

const TrackSlider = () => {
  const {position, duration} = useTrackPlayerProgress();

  const handleSlidingComplete = value => {
    console.log('duration', duration);
    console.log('current pos ', position);
    console.log('Seeking to ', value);
    TrackPlayer.seekTo(value);
  };
  return (
    <React.Fragment>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration || 1}
        value={position || 0}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="lime"
        onSlidingComplete={handleSlidingComplete}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    borderRadius: 2,
    height: 30,
    marginVertical: 15,
  },
});

export default TrackSlider;

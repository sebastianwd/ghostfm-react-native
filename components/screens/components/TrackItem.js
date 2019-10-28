import React, {memo} from 'react';
import {List, TouchableRipple, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import useMusicPlayer from '../../misc/hooks/useMusicPlayer';
import useApi from '../../misc/hooks/useApi';
import TrackPlayer from 'react-native-track-player';

const TrackItem = memo(({item, trackList}) => {
  const {playTrack, updateMetadata, setQueue} = useMusicPlayer();
  const {getMP3} = useApi();

  const handlePress = (artistName, trackName) => {
    console.log('searching ', `${artistName} ${trackName}`);
    getMP3(`${artistName} ${trackName}`).then(mp3Url => {
      const trackData = {
        id: item.id,
        url: mp3Url[0],
        title: trackName,
        artist: artistName,
      };

      let playlist = trackList.slice(0);
      let index = playlist.findIndex(track => track.id === item.id);
      playlist.splice(index, 1, trackData);

      TrackPlayer.reset().then(() => {
        TrackPlayer.add(playlist).then(() => {
          updateMetadata(trackData);
          TrackPlayer.skip(item.id).then(() => {
            playTrack(trackData);
            TrackPlayer.play();
          });
        });
      });

      setQueue(playlist);
    });
  };

  return (
    <View style={styles.itemContainer}>
      <List.Item
        style={styles.item}
        title={item.title}
        onPress={() => handlePress(item.artist, item.title)}
        left={props => {
          return (
            <React.Fragment>
              <Text style={styles.itemNumber}>{item.id - 10}</Text>
              <List.Icon {...props} icon="play-circle" />
            </React.Fragment>
          );
        }}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  item: {
    paddingVertical: 3,
  },
  itemNumber: {
    alignSelf: 'center',
  },
  itemContainer: {
    borderWidth: 1,
  },
});

export default TrackItem;

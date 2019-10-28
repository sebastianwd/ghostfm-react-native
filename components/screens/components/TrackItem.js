import React from 'react';
import {List, TouchableRipple, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import useMusicPlayer from '../../misc/hooks/useMusicPlayer';
import useApi from '../../misc/hooks/useApi';
import {updateMetadataForTrack} from 'react-native-track-player';
const TrackItem = ({item, onPlay}) => {
  const {playTrack, updateMetadata, setQueue} = useMusicPlayer();
  const {getMP3, getTrackInfo} = useApi();

  const handlePress = (artistName, trackName) => {
    console.log('pressed');
    console.log('searching ', `${artistName} ${trackName}`);
    getMP3(`${artistName} ${trackName}`).then(mp3Url => {
      console.log('url mp3', mp3Url[0]);

      const trackData = {
        id: item.id,
        url: mp3Url[0],
        title: trackName,
        artist: artistName,
      };

      playTrack(trackData);
      onPlay();
      updateMetadata(item.id, trackData);
    });
  };

  return (
    <View style={styles.itemContainer}>
      <List.Item
        style={styles.item}
        title={item.name}
        onPress={() => handlePress(item.artist.strArtist, item.name)}
        left={props => {
          return (
            <React.Fragment>
              <Text style={styles.itemNumber}>{item.number}</Text>
              <List.Icon {...props} icon="play-circle" />
            </React.Fragment>
          );
        }}
      />
    </View>
  );
};
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

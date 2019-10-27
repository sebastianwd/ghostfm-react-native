import React from 'react';
import {List, TouchableRipple, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import useMusicPlayer from '../../misc/hooks/useMusicPlayer';
import useApi from '../../misc/hooks/useApi';
const TrackItem = ({item}) => {
  const {playTrack} = useMusicPlayer();
  const {getMP3} = useApi();

  const handlePress = (artistName, trackName) => {
    console.log('pressed');
    console.log('searching ', `${artistName} ${trackName}`);
    getMP3(`${artistName} ${trackName}`).then(mp3Url => {
      console.log('url mp3', mp3Url[0]);
      playTrack({
        id: item.id,
        url: mp3Url[0],
        title: trackName,
        artist: artistName,
      });
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
              <Text style={styles.itemNumber}>{item.id}</Text>
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

import React, {useState, useEffect} from 'react';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import {
  withTheme,
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
} from 'react-native-paper';
import useApi from '../misc/hooks/useApi';
import TrackList from '../screens/components/TrackList';

const ArtistScreen = props => {
  const {navigation} = props;
  const {colors} = props.theme;

  const artistName = navigation.getParam('artistName', '');

  const [artist, setArtist] = useState();
  const [topTracks, setTopTracks] = useState();

  const {getArtistByName, getTopTracksByArtistName} = useApi();

  useEffect(() => {
    if (!artistName) {
      return;
    }
    getArtistByName(artistName).then(artistData => {
      setArtist(artistData);
      console.log('artist', artistData);
    });
    getTopTracksByArtistName(artistName).then(topTracks => {
      setTopTracks(topTracks);
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    card: {
      paddingBottom: 0,
      marginBottom: 0,
    },
    title: {
      transform: [{translateY: -30}],
      backgroundColor: '#0f0f0f94',
      height: 30,
    },
  });
  return (
    <ScrollView style={styles.container}>
      {artist && (
        <React.Fragment>
          <Card style={styles.card}>
            <Card.Cover source={{uri: artist.strArtistThumb}} />
            <Card.Title title={artist.strArtist} style={styles.title} />
          </Card>
          {topTracks && <TrackList trackList={topTracks}></TrackList>}
        </React.Fragment>
      )}
    </ScrollView>
  );
};

export default withTheme(ArtistScreen);

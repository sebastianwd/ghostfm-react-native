import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import {withTheme, Text} from 'react-native-paper';
import useApi from '../misc/hooks/useApi';

const ArtistScreen = props => {
  const {navigation} = props;
  const {colors} = props.theme;

  const artistName = navigation.getParam('artistName', 'default value');

  const [artist, setArtist] = useState();
  const {getArtistByName} = useApi();

  useEffect(() => {
    getArtistByName(artistName).then(artistData => {
      setArtist(artistData);
      console.log('artist', artistData);
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
  });

  return (
    <ScrollView style={styles.container}>
      {artist && (
        <View>
          <Text>artist: {artist.strArtist}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default withTheme(ArtistScreen);

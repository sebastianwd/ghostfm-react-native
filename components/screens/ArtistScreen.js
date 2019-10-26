import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
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

const ArtistScreen = props => {
  const {navigation} = props;
  const {colors} = props.theme;

  const artistName = navigation.getParam('artistName', '');

  const [artist, setArtist] = useState();
  const {getArtistByName} = useApi();

  useEffect(() => {
    if (!artistName) {
      return;
    }
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
        <Card>
          <Card.Content>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Cover source={{uri: artist.strArtistThumb}} />
          <Card.Title
            title={artist.strArtist}
            subtitle="Card Subtitle"
            left={props => <Avatar.Icon size={200} {...props} icon="folder" />}
          />
        </Card>
      )}
    </ScrollView>
  );
};

export default withTheme(ArtistScreen);

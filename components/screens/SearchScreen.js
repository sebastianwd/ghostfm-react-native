import React, {useState} from 'react';
import {Text, List, TouchableRipple} from 'react-native-paper';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import TopBar from '../ui/TopBar';
import NavigationService from '../misc/NavigationService';
import {withTheme} from 'react-native-paper';

const SearchScreen = props => {
  const [searchResults, setSearchResults] = useState();
  const {colors} = props.theme;

  const handlePress = artistName => {
    NavigationService.navigate('Artist', {artistName});
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    item: {
      paddingVertical: 0,
    },
  });

  return (
    <React.Fragment>
      <TopBar setSearchResults={setSearchResults}></TopBar>
      <ScrollView style={styles.container}>
        <List.Section>
          <List.Subheader>Results</List.Subheader>
          <FlatList
            data={searchResults}
            renderItem={({item}) => (
              <TouchableRipple
                onPress={() => handlePress(item.strArtist)}
                rippleColor="rgba(20, 20, 40, 0.8)">
                <List.Item
                  style={styles.item}
                  title={item.strArtist}
                  left={() => <List.Icon icon="artist" />}
                />
              </TouchableRipple>
            )}
            keyExtractor={item => item.strArtist}
          />
        </List.Section>
      </ScrollView>
    </React.Fragment>
  );
};

export default withTheme(SearchScreen);

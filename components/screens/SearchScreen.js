import React, {useState} from 'react';
import {Text, List, TouchableRipple} from 'react-native-paper';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import TopBar from '../ui/TopBar';
import NavigationService from '../misc/NavigationService';

const SearchScreen = props => {
  const [searchResults, setSearchResults] = useState();

  const handlePress = artistName => {
    NavigationService.navigate('Artist', {artistName});
  };

  return (
    <React.Fragment>
      <TopBar setSearchResults={setSearchResults}></TopBar>
      <ScrollView>
        <List.Section>
          <List.Subheader>Resultados</List.Subheader>
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

const styles = StyleSheet.create({
  item: {
    paddingVertical: 0,
  },
});

export default SearchScreen;

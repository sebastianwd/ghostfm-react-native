import {Appbar, Searchbar, Text, List} from 'react-native-paper';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import useApi from '../misc/hooks/useApi';
const TopBar = ({setSearchResults}) => {
  const {searchAutocomplete} = useApi();

  const handleChangeText = async query => {
    console.log(query);
    const data = await searchAutocomplete(query);
    console.log(data);
    setSearchResults(data);
  };

  return (
    <Appbar.Header>
      <View style={styles.inputContainer}>
        <Searchbar
          placeholder="Search"
          style={styles.input}
          onChangeText={handleChangeText}
          placeholder={'Search artists...'}
        />
      </View>

      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
  },
  input: {
    flexGrow: 1,
    backgroundColor: '#344294',
    zIndex: 1,
  },
  results: {
    zIndex: 2,
  },
  resultItem: {
    flexGrow: 1,
    backgroundColor: '#344294',
  },
});

export default TopBar;

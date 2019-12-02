import { Appbar, Searchbar, Text, List } from "react-native-paper";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import useApi from "../misc/hooks/useApi";
const TopBar = ({ setSearchResults }) => {
  const { searchAutocomplete } = useApi();

  let timeout = 0;
  const handleChangeText = query => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const data = await searchAutocomplete(query);
      setSearchResults(data);
    }, 300);
  };

  return (
    <Appbar.Header>
      <View style={styles.inputContainer}>
        <Searchbar
          placeholder='Search'
          style={styles.input}
          onChangeText={handleChangeText}
          placeholder={"Search artists..."}
        />
      </View>

      <Appbar.Action icon='dots-vertical' />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexGrow: 1,
    flexDirection: "column",
    position: "relative",
    height: "100%"
  },
  input: {
    flexGrow: 1,
    backgroundColor: "#1d1d1d",
    zIndex: 1
  },
  results: {
    zIndex: 2
  },
  resultItem: {
    flexGrow: 1,
    backgroundColor: "#1d1d1d"
  }
});

export default TopBar;

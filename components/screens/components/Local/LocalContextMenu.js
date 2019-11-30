import React from "react";
import { Drawer, Text, TouchableRipple } from "react-native-paper";
import { StyleSheet, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useApi from "../../../misc/hooks/useApi";
import RNFetchBlob from "rn-fetch-blob";
import NavigationService from "../../../misc/NavigationService";

export const LocalContextMenu = ({ item }) => {
  const { getLyrics } = useApi();
  const showLyrics = () => {
    getLyrics(item.artist, item.title).then(response => {
      console.log(response);
      if (response && !response.error) {
        Alert.alert(
          item.title,
          response,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
      }
    });
  };

  const addToPlaylist = () => {
    NavigationService.navigate("Playlist", { mode: "ADD", track: item });
  };

  return (
    <>
      <View style={styles.sheetContainer}>
        <Text style={styles.title}>{`${item.artist} - ${item.title}`}</Text>
        <TouchableRipple style={styles.optionContainer} onPress={addToPlaylist}>
          <Icon name='playlist-plus' color='white' size={24} />
          <Text style={styles.option}> {"Add to playlist"}</Text>
        </TouchableRipple>
        <TouchableRipple style={styles.optionContainer} onPress={showLyrics}>
          <>
            <Icon name='download' color='white' size={24} />
            <Text style={styles.option}> Lyrics</Text>
          </>
        </TouchableRipple>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  sheetContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14
  },
  option: {
    fontSize: 16,
    paddingLeft: 16
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 18,
    paddingBottom: 12
  },
  optionContainer: {
    flexDirection: "row",
    paddingVertical: 12
  }
});

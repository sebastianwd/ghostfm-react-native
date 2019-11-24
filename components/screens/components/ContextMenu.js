import React from "react";
import { Drawer, Text, TouchableRipple } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useApi from "../../misc/hooks/useApi";
import RNFetchBlob from "rn-fetch-blob";
// TODO: delete RNBackgroundDownloader

let dirs = RNFetchBlob.fs.dirs;

export const ContextMenu = ({ item }) => {
  const { getMP3 } = useApi();
  const downloadTrack = () => {
    getMP3(`${item.artist} ${item.title}`).then(mp3Url => {
      RNFetchBlob.config({
        addAndroidDownloads: {
          title: item.title,
          useDownloadManager: true, // <-- this is the only thing required
          notification: true,
          // the url does not contains a file extension, by default the mime type will be text/plain
          path: dirs.DCIMDir + "/" + item.title + ".mp3",
          mime: "audio/mpeg",
          description: "Downloading...."
        }
      })
        .fetch("GET", mp3Url[0], {})
        .then(res => {
          console.log("The file saved to ", res.path());
        })
        .catch((errorMessage, statusCode) => {
          console.log("err ", errorMessage);
        });
    });
  };

  return (
    <>
      <View style={styles.sheetContainer}>
        <Text style={styles.title}>{`${item.artist} - ${item.title}`}</Text>
        <View style={styles.optionContainer}>
          <Icon name='playlist-plus' color='white' size={24} />
          <Text style={styles.option}> {"Add to playlist"}</Text>
        </View>
        <TouchableRipple style={styles.optionContainer} onPress={downloadTrack}>
          <>
            <Icon name='download' color='white' size={24} />
            <Text style={styles.option}> {"Download"}</Text>
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

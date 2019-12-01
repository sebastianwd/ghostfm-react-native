import React, { useState, useEffect, useRef } from "react";
import { ScrollView, FlatList } from "react-native";
import { View, StyleSheet } from "react-native";
import {
  withTheme,
  Text,
  Card,
  Title,
  Headline,
  Button,
  Avatar
} from "react-native-paper";
import useApi from "../misc/hooks/useApi";
import SafeAreaView from "react-native-safe-area-view";
import TrackItem from "./components/TrackItem";
import { FALLBACK_MP3 } from "../misc/Utils";
import RBSheet from "react-native-raw-bottom-sheet";
import { ContextMenu } from "./components/ContextMenu";

const AlbumTracksScreen = props => {
  const { navigation } = props;
  const { colors } = props.theme;

  const artistName = navigation.getParam("artistName", "");
  const album = navigation.getParam("album", "");
  const { getAlbumInfo } = useApi();
  const btmSheetRef = useRef();

  const [albumTracks, setAlbumTracks] = useState();
  const [currentTrackOptions, setState] = useState();
  useEffect(() => {
    getAlbumInfo(artistName, album.strAlbum).then(albumInfo => {
      let albumTracks = albumInfo.tracks.track.map((item, index) => {
        return {
          id: (index + 11).toString(),
          artist: artistName,
          title: item.name,
          url: FALLBACK_MP3
        };
      });
      setAlbumTracks(albumTracks);
    });
  }, [artistName, album]);

  const openSheet = item => {
    btmSheetRef.current.open();
    setState(item);
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <Headline style={styles.title}>{album.strAlbum}</Headline>
      {albumTracks && (
        <FlatList
          data={albumTracks}
          renderItem={({ item }) => (
            <TrackItem
              item={item}
              trackList={albumTracks}
              openSheet={openSheet}></TrackItem>
          )}
          keyExtractor={item => item.id}
        />
      )}
      <RBSheet
        ref={btmSheetRef}
        height={250}
        duration={250}
        customStyles={{
          container: {
            justifyContent: "flex-start",
            alignItems: "stretch",
            backgroundColor: "#1a1a1b"
          }
        }}>
        {currentTrackOptions && (
          <ContextMenu item={currentTrackOptions}> </ContextMenu>
        )}
      </RBSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 8,
    height: 30
  }
});

export default withTheme(AlbumTracksScreen);

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
  Avatar,
  Subheading
} from "react-native-paper";
import useApi from "../misc/hooks/useApi";
import SafeAreaView from "react-native-safe-area-view";
import TrackItem from "./components/TrackItem";
import { FALLBACK_MP3 } from "../misc/Utils";
import { useStorage } from "../misc/hooks/useStorage";
import { LocalTrackList } from "./components/Local/LocalTrackList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PlaylistTracksScreen = props => {
  const { navigation } = props;
  const { colors } = props.theme;

  const playlistId = navigation.getParam("playlistId", "");
  const { store } = useStorage();

  const [playlist, setPlaylist] = useState();
  const [reload, setReload] = useState(0);

  const loadTracks = async () => {
    let playlists = await store.get("playlists");
    playlists = JSON.parse(playlists);
    let playlist = playlists.find(o => {
      return o.id === playlistId;
    });

    setPlaylist(playlist);
  };

  useEffect(() => {
    loadTracks();
  }, [reload]);

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      {playlist && (
        <>
          <Headline style={styles.title}>{playlist && playlist.name}</Headline>
          {playlist.tracks && playlist.tracks.length > 0 && (
            <LocalTrackList
              tracks={playlist.tracks}
              playlistId={playlistId}
              reload={setReload}></LocalTrackList>
          )}
          {(!playlist.tracks || playlist.tracks.length < 1) && (
            <Subheading style={{ alignSelf: "center", marginTop: 36 }}>
              This playlist is empty
            </Subheading>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 16,
    marginLeft: 8,
    height: 30
  }
});

export default withTheme(PlaylistTracksScreen);

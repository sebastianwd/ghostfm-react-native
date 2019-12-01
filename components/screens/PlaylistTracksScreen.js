import React, { useState, useEffect, useRef } from "react";
import { ScrollView, FlatList } from "react-native";
import { View, StyleSheet, Alert, ToastAndroid } from "react-native";
import {
  withTheme,
  Text,
  Card,
  Title,
  Headline,
  Button,
  Avatar,
  Subheading,
  Menu,
  Divider,
  Portal,
  Dialog,
  TextInput
} from "react-native-paper";
import useApi from "../misc/hooks/useApi";
import SafeAreaView from "react-native-safe-area-view";
import TrackItem from "./components/TrackItem";
import { FALLBACK_MP3 } from "../misc/Utils";
import { useStorage } from "../misc/hooks/useStorage";
import { LocalTrackList } from "./components/Local/LocalTrackList";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { usePlaylist } from "../misc/hooks/usePlaylist";
import NavigationService from "../misc/NavigationService";

const Header = props => {
  const [visible, setVisible] = useState(false);
  const { deletePlaylist } = usePlaylist();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { storage } = useStorage();
  const { playlistId } = props;

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const removePlaylist = () => {
    Alert.alert(
      "",
      "Do you want to permanently delete this playtlist?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            closeMenu();
            deletePlaylist(playlistId);
            NavigationService.goBack();
            ToastAndroid.show("Playlist deleted", ToastAndroid.SHORT);
          }
        }
      ],
      { cancelable: false }
    );
  };
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => {
    setDialogVisible(false);
    setInputValue("");
  };

  const renamePlaylist = async () => {
    let playlists = await storage.get("playlists");
    playlists = JSON.parse(playlists);
    let foundIndex = playlists.findIndex(x => x.id == playlistId);
    playlists[foundIndex].name = inputValue;
    await storage.set("playlists", JSON.stringify(playlists));
    hideDialog();
    closeMenu();
  };
  const handleChange = text => {
    setInputValue(text);
  };

  return (
    <TouchableOpacity>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Icon
            name='dots-vertical'
            onPress={openMenu}
            size={25}
            color={"white"}
          />
        }>
        <Menu.Item onPress={showDialog} title='Rename' />
        <Menu.Item onPress={removePlaylist} title='Delete playlist' />
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Title>Rename playlist</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label='New name'
                value={inputValue}
                onChangeText={handleChange}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} mode={"contained"}>
                Cancel
              </Button>
              <Button onPress={renamePlaylist} mode={"contained"}>
                Rename
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Menu>
    </TouchableOpacity>
  );
};

const PlaylistTracksScreen = props => {
  const { navigation } = props;
  const { colors } = props.theme;

  const playlistItem = navigation.getParam("playlist", "");
  const { storage } = useStorage();

  const [playlist, setPlaylist] = useState();
  const [reload, setReload] = useState(0);
  const loadTracks = async () => {
    let playlists = await storage.get("playlists");
    playlists = JSON.parse(playlists);
    let playlist = playlists.find(o => {
      return o.id === playlistItem.id;
    });
    setPlaylist(playlist);
  };

  useEffect(() => {
    loadTracks();
  }, [reload]);

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background, flex: 1, paddingTop: 16 }}>
      {playlist && (
        <>
          {playlist.tracks && playlist.tracks.length > 0 && (
            <LocalTrackList
              tracks={playlist.tracks}
              playlistId={playlist.id}
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
const PlaylistTracksScreenComponent = withTheme(PlaylistTracksScreen);
PlaylistTracksScreenComponent.navigationOptions = ({ navigation }) => {
  const playlist = navigation.getParam("playlist", "");
  return {
    title: playlist.name,

    headerRight: () => (
      <Header navigation={navigation} playlistId={playlist.id} />
    )
  };
};
export default PlaylistTracksScreenComponent;

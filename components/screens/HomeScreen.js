import React, { useState, useEffect, memo } from "react";
import {
  Text,
  Button,
  List,
  Avatar,
  TouchableRipple
} from "react-native-paper";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { withTheme } from "react-native-paper";
import MusicFiles from "react-native-get-music-files";
import { DeviceEventEmitter, Dimensions } from "react-native";
import { RNAndroidAudioStore } from "react-native-get-music-files";
import SafeAreaView from "react-native-safe-area-view";
import Snackbar from "react-native-snackbar";
import { useStorage } from "../misc/hooks/useStorage";
import { requestPermission } from "../misc/permissions";
import { View } from "react-native-animatable";
import QuickScrollList from "react-native-quick-scroll";
import FastImage from "react-native-fast-image";
import { LocalTrackList } from "../screens/components/Local/LocalTrackList";
import { SettingsDialog } from "./components/SettingsDialog";

const { width, height } = Dimensions.get("window");
/*
const LocalTrackItem = props => {
  const { item } = props;
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <List.Item
          title={`${item.title || ""}`}
          description={`${item.author || ""}`}
          style={{ width: "85%" }}
          left={props => (
            <FastImage
              {...props}
              style={{ width: 48, height: 48, borderRadius: 24 }}
              source={{
                uri: item.cover,
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}></List.Item>

        <TouchableOpacity>
          <List.Icon icon='dots-vertical' />
        </TouchableOpacity>
      </View>
    </>
  );
};*/

const HomeScreen = memo(props => {
  const { colors } = props.theme;
  const [tracks, setSongs] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const { storage } = useStorage();

  const onRefresh = () => {
    console.log("refres");
    setRefreshing(true);
    storage.remove("songs").then(() => {
      DeviceEventEmitter.removeAllListeners();
      DeviceEventEmitter.addListener("onBatchReceived", params => {
        setSongs(tracks => [...tracks, ...params.batch]);
      });
      DeviceEventEmitter.addListener("onLastBatchReceived", params => {
        setRefreshing(false);
        storage.set("songs", JSON.stringify(tracks));
      });
      setSongs([]);
      getAll();
    });
  };

  const getAll = () => {
    Snackbar.show({
      title: "Loading songs...",
      duration: Snackbar.LENGTH_LONG,
      action: {
        title: "Dismiss",
        color: "green"
      }
    });
    RNAndroidAudioStore.getAll({
      id: true,
      artist: true,
      duration: true, //default : true
      cover: true, //default : true,
      genre: true,
      title: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
      batchNumber: 80,
      delay: 600
    })
      .catch(er => alert(JSON.stringify(error)))
      .finally(() => {
        setRefreshing(false);
      });
  };

  const checkExistingSongs = async () => {
    let localSongs = await storage.get("songs");
    if (localSongs) {
      setSongs(JSON.parse(localSongs));
      return;
    }
    DeviceEventEmitter.addListener("onBatchReceived", params => {
      setSongs(tracks => [...tracks, ...params.batch]);
    });

    getAll();
  };

  useEffect(() => {
    requestPermission();

    checkExistingSongs();

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  DeviceEventEmitter.addListener("onLastBatchReceived", params => {
    setRefreshing(false);
    storage.set("songs", JSON.stringify(tracks));
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/*tracks.length > 0 && (
        <FlatList
          data={tracks}
          renderItem={LocalTrackItem}
          keyExtractor={item => String(item.id)}
          removeClippedSubviews={true}
          initialNumToRender={50}
          maxToRenderPerBatch={100}
          updateCellsBatchingPeriod={5}
          windowSize={40}
          getItemLayout={(data, index) => ({
            length: 70,
            offset: 70 * index,
            index
          })}
        />
      )*/}

      <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
        <SettingsDialog onRefresh={onRefresh}></SettingsDialog>
      </View>
      {tracks.length > 0 && <LocalTrackList tracks={tracks}></LocalTrackList>}
    </View>
  );
});

export default withTheme(HomeScreen);

import React, { useEffect, useState } from "react";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Feather";
import useMusicPlayer from "../../../misc/hooks/useMusicPlayer";
import { State } from "react-native-track-player";
import { useTrackPlayerProgress } from "react-native-track-player";
import TrackSlider from "./TrackSlider";
import TrackPlayer from "react-native-track-player";
import NavigationService from "../../../misc/NavigationService";
import useApi from "../../../misc/hooks/useApi";
import { useStorage } from "../../../misc/hooks/useStorage";

const fallbackArtwork = "https://i.imgur.com/dWF1FAo.png";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  root: {
    height: height,
    maxHeight: height
  },
  container: {
    margin: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    padding: 16
  },
  title: {
    color: "white",
    fontSize: 12,
    padding: 16,
    maxWidth: "80%",
    letterSpacing: 3,
    textTransform: "uppercase"
  },
  cover: {
    alignSelf: "center",
    marginVertical: 16,
    width: width - 70,
    height: width - 70
  },
  metadata: {
    width: width - 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center"
  },
  song: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    maxWidth: width - 64
  },
  artist: {
    color: "white"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 80
  }
});

const PlayerScreen = () => {
  const {
    playerState,
    isPlaying,
    handlePlayPause,
    setRandom
  } = useMusicPlayer();
  const { getLyrics } = useApi();

  const playPrev = () => {
    TrackPlayer.skipToPrevious();
  };

  const playNext = () => {
    TrackPlayer.skipToNext();
  };

  const showLyrics = () => {
    getLyrics(playerState.current.artist, playerState.current.title).then(
      response => {
        if (response && !response.error) {
          Alert.alert(
            playerState.current.title,
            response,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
          );
          4;
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient
        colors={["#1b1b42", "#111111"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <RectButton style={styles.button}>
            <Icon
              name='chevron-down'
              color='white'
              size={24}
              onPress={() => {
                NavigationService.goBack();
              }}
            />
          </RectButton>
          <TouchableOpacity
            style={{
              alignItems: "center",
              width: 150
            }}>
            <Text numberOfLines={1} style={styles.title} onPress={showLyrics}>
              Lyrics
            </Text>
          </TouchableOpacity>
          <RectButton style={styles.button}>
            <Icon name='more-horizontal' color='white' size={24} />
          </RectButton>
        </View>
        <Image
          source={{ uri: playerState.current.artwork || fallbackArtwork }}
          style={styles.cover}
        />

        <View style={styles.metadata}>
          <View>
            <Text numberOfLines={1} style={styles.song}>
              {playerState.current.title}
            </Text>
            <Text numberOfLines={1} style={styles.artist}>
              {playerState.current.artist}
            </Text>
          </View>
        </View>
        <TrackSlider></TrackSlider>
        <View style={styles.controls}>
          <AntDesign
            name='stepbackward'
            color='white'
            size={32}
            onPress={playPrev}
          />
          <AntDesign
            name={isPlaying ? "pausecircleo" : "play"}
            color='white'
            size={48}
            onPress={handlePlayPause}
          />
          <AntDesign
            name='stepforward'
            color='white'
            size={32}
            onPress={playNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayerScreen;

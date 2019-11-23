import React from "react";
import { RectButton } from "react-native-gesture-handler";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
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
    padding: 16,
    maxWidth: "80%"
  },
  cover: {
    alignSelf: "center",
    marginVertical: 16,
    width: width - 100,
    height: width - 100
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  song: {
    fontSize: 28,
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
  const { playerState, isPlaying, handlePlayPause } = useMusicPlayer();

  const playPrev = () => {
    TrackPlayer.skipToPrevious();
  };

  const playNext = () => {
    TrackPlayer.skipToNext();
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
          <Text numberOfLines={2} style={styles.title}>
            {playerState.current.title}
          </Text>
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
            <Text numberOfLines={2} style={styles.song}>
              {playerState.current.title}
            </Text>
            <Text style={styles.artist}>{playerState.current.artist}</Text>
          </View>
          <AntDesign name='heart' size={24} color='#55b661' />
        </View>
        <TrackSlider></TrackSlider>
        <View style={styles.controls}>
          <Icon name='shuffle' color='rgba(255, 255, 255, 0.5)' size={24} />
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
          <Icon name='repeat' color='rgba(255, 255, 255, 0.5)' size={24} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayerScreen;

import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { WebView } from "react-native-webview";
import {
  withTheme,
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  Subheading
} from "react-native-paper";
import useApi from "../misc/hooks/useApi";
import TrackList from "../screens/components/TrackList";
import SafeAreaView from "react-native-safe-area-view";
import { SimilarArtists } from "../screens/components/SimilarArtists";
import { Tab, TabView } from "react-native-easy-tabs";
import { AlbumList } from "../screens/components/AlbumList";
import LinearGradient from "react-native-linear-gradient";

const ArtistScreen = props => {
  const { navigation } = props;
  const { colors } = props.theme;

  const artistName = navigation.getParam("artistName", "");
  const scrollRef = useRef();

  const [artist, setArtist] = useState();
  const [topTracks, setTopTracks] = useState();
  const [currentTab, setCurrentTab] = useState(0);

  const [videoId, setVideoId] = useState();

  const { getArtistByName, getTopTracksByArtistName, getVideoId } = useApi();

  useEffect(() => {
    if (!artistName) {
      return;
    }
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    getArtistByName(artistName).then(artistData => {
      setArtist(artistData);
      console.log("artist", artistData);
    });
    getTopTracksByArtistName(artistName).then(topTracks => {
      setTopTracks(topTracks);
    });
  }, [artistName]);

  console.log(videoId);

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, flex: 1 }}
      ref={scrollRef}>
      <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
        {artist && (
          <React.Fragment>
            <Card style={styles.card}>
              <Card.Cover source={{ uri: artist.strArtistThumb }} />
              <LinearGradient
                colors={["#11111148", "#070707ea"]}
                style={StyleSheet.absoluteFill}
              />
            </Card>
            {videoId && (
              <WebView
                style={{ flex: 1, height: 200 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{
                  uri: `https://iframe-loader.netlify.com/${videoId}`
                }}
              />
            )}
            <View style={{ alignItems: "flex-start", flexDirection: "row" }}>
              <Button mode='contained' onPress={() => setCurrentTab(0)}>
                Songs
              </Button>
              <Button mode='contained' onPress={() => setCurrentTab(1)}>
                Albums
              </Button>
            </View>
            <TabView selectedTabIndex={currentTab}>
              <Tab>
                {topTracks && (
                  <TrackList
                    trackList={topTracks}
                    setVideoId={setVideoId}></TrackList>
                )}
              </Tab>
              <Tab lazy>
                <AlbumList artistName={artistName}></AlbumList>
              </Tab>
            </TabView>

            <Title style={{ padding: 8 }}>Similar artists</Title>
            <SimilarArtists artistName={artistName}></SimilarArtists>
          </React.Fragment>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingBottom: 0,
    marginBottom: 0
  },
  title: {
    transform: [{ translateY: -30 }],
    backgroundColor: "#0f0f0f94",
    height: 30
  }
});

const ArtistScreenComponent = withTheme(ArtistScreen);
ArtistScreenComponent.navigationOptions = ({ navigation }) => {
  const artistName = navigation.getParam("artistName", "");
  return {
    title: artistName
  };
};

export default ArtistScreenComponent;

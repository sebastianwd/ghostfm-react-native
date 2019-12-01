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
import SafeAreaView from "react-native-safe-area-view";
import { LocalTrackList } from "./components/Local/LocalTrackList";

const LocalTrackListScreen = props => {
  const { navigation } = props;
  const { colors } = props.theme;

  const tracks = navigation.getParam("tracks", "");

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      {tracks && tracks.length > 0 && (
        <LocalTrackList tracks={tracks}></LocalTrackList>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 8,
    height: 30
  }
});

export default withTheme(LocalTrackListScreen);

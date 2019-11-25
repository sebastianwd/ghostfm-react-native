import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import {
  withTheme,
  Text,
  Card,
  Title,
  Headline,
  Button,
  Avatar,
  Surface,
  List
} from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import TrackItem from "./components/TrackItem";
import NavigationService from "../misc/NavigationService";

const SettingsScreen = props => {
  const { navigation } = props;
  const { colors } = props.theme;

  const goToChat = () => {
    NavigationService.navigate("Chat");
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <List.Item
        title='Report a bug'
        style={styles.item}
        description='Open an issue on our Github repo'
        left={props => <List.Icon {...props} icon='bug' />}
      />
      <List.Item
        title='Help'
        style={styles.item}
        description='Chat with a virtual assistant'
        onPress={goToChat}
        left={props => <List.Icon {...props} icon='message-text-outline' />}
      />
      <List.Item
        title='About'
        style={styles.item}
        description='About this app'
        left={props => <List.Icon {...props} icon='information-outline' />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 8,
    height: 30
  },
  item: {
    paddingVertical: 4
  }
});

export default withTheme(SettingsScreen);

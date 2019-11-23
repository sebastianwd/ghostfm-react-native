import React, { useState } from "react";
import { Text } from "react-native-paper";
import TopNav from "../ui/TopNav";
import SafeAreaView from "react-native-safe-area-view";
import { withTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

const LibraryScreen = props => {
  const { colors } = props.theme;

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <TopNav></TopNav>
    </SafeAreaView>
  );
};

export default withTheme(LibraryScreen);

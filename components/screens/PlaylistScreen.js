import React, { useState } from "react";
import { Text } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import { ScrollView } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { View } from "react-native-animatable";

const PlaylistScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>Playlists</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default PlaylistScreen;

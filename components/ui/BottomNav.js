import React, { useState } from "react";
import MiniPlayer from "../screens/components/MiniPlayer/Player";
import { BottomTabBar } from "react-navigation-tabs";
import { withTheme } from "react-native-paper";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import NavigationService from "../misc/NavigationService";
import { useKeyboard } from "../misc/hooks/useKeyboard";

const BottomNav = ({ theme, ...otherProps }) => {
  const { colors } = theme;

  const { isKeyboardVisible } = useKeyboard();

  const handlePress = () => {
    NavigationService.navigate("Player");
    console.log("pressed");
  };

  let tabBarStyles = {
    backgroundColor: "#1a1a1b"
  };

  if (isKeyboardVisible) {
    tabBarStyles.marginTop = -50;
  }

  return (
    <React.Fragment>
      <MiniPlayer
        style={{ backgroundColor: colors.background }}
        onPress={handlePress}></MiniPlayer>
      <BottomTabBar {...otherProps} style={tabBarStyles} />
    </React.Fragment>
  );
};

export default withTheme(BottomNav);

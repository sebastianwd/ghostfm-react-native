import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import { Subheading, Text, withTheme } from "react-native-paper";
import { StyleSheet, Dimensions, Linking } from "react-native";

const { width, height } = Dimensions.get("window");

const AboutScreen = props => {
  const { colors } = props.theme;

  const goToRepo = () => {
    Linking.openURL("https://github.com/sebastianwd/ghostfm-react-native");
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
        alignItems: "center",
        paddingTop: height / 6
      }}>
      <Subheading style={styles.subheading}> GhostFM</Subheading>

      <Subheading style={styles.subheading}> Developed by</Subheading>
      <Text>Sebastian Luque - Main developer</Text>
      <Text>Rafael Orellana - Documentation</Text>
      <Text>Sergio Santivañez - Documentation</Text>
      <Text style={{ marginTop: 26 }}>
        For more information visit our{" "}
        <Text style={styles.link} onPress={goToRepo}>
          {" "}
          Github repo
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subheading: {
    fontSize: 18,
    color: "white",
    marginTop: 20
  },
  link: {
    color: "#3c89e294"
  }
});

export default withTheme(AboutScreen);

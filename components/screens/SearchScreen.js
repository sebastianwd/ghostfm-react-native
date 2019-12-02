import React, { useState } from "react";
import { Text, List, TouchableRipple } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import TopBar from "../ui/TopBar";
import NavigationService from "../misc/NavigationService";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { withTheme } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import { View } from "react-native-animatable";

const SearchScreen = props => {
  const [searchResults, setSearchResults] = useState([]);
  const { colors } = props.theme;

  const handlePress = artistName => {
    NavigationService.navigate("Artist", { artistName });
  };

  return (
    <React.Fragment>
      <TopBar setSearchResults={setSearchResults}></TopBar>
      <SafeAreaView
        style={{
          backgroundColor: colors.background,
          flex: 1
        }}
        keyboardShouldPersistTaps={"always"}>
        <List.Section>
          <List.Subheader>Results</List.Subheader>
          {searchResults.length > 0 && (
            <FlatList
              keyboardShouldPersistTaps={"always"}
              data={searchResults}
              renderItem={({ item }) => (
                <TouchableRipple
                  onPress={() => handlePress(item.strArtist)}
                  rippleColor='rgba(20, 20, 40, 0.8)'>
                  <List.Item
                    style={styles.item}
                    title={item.strArtist}
                    left={() => <List.Icon icon='artist' />}
                  />
                </TouchableRipple>
              )}
              keyExtractor={item => item.strArtist}
            />
          )}
          {searchResults.length < 1 && (
            <View
              style={{
                height: "80%",
                alignItems: "center",
                justifyContent: "center"
              }}>
              <Icon name={"magnify"} size={48} color={"#a8a8a8be"}></Icon>
              <Text style={{ color: "#a8a8a8be" }}>
                Type an artist name into the searchbar
              </Text>
            </View>
          )}
        </List.Section>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 0
  }
});

export default withTheme(SearchScreen);

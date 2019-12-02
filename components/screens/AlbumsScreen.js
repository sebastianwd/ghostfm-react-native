import React, { useState, useEffect } from "react";
import { Text, Card, Title, Paragraph } from "react-native-paper";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList
} from "react-native";
import { RNAndroidAudioStore } from "react-native-get-music-files";
import { TouchableOpacity } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import { View, Image } from "react-native";
import NavigationService from "../misc/NavigationService";
import { useStorage } from "../misc/hooks/useStorage";
const { width, height } = Dimensions.get("window");

const AlbumsScreen = () => {
  const [albums, setAlbums] = useState();
  const { storage } = useStorage();

  const getAlbums = () => {
    RNAndroidAudioStore.getAlbums()
      .then(albums => {
        setAlbums(albums);
        storage.set("albums", JSON.stringify(albums));
      })
      .catch(error => alert(JSON.stringify(error)));
  };
  const checkExistingAlbums = async () => {
    let localAlbums = await storage.get("albums");
    if (localAlbums) {
      setAlbums(JSON.parse(localAlbums));
      return;
    }

    getAlbums();
  };

  useEffect(() => {
    checkExistingAlbums();
  }, []);

  const showTracks = item => {
    RNAndroidAudioStore.getSongs({ album: item.album })
      .then(songs => {
        songs.forEach(o => {
          o.artwork = "file://" + item.cover;
          o.url = o.path;
        });
        console.log("songs", songs);
        NavigationService.navigate("LocalTrackList", {
          tracks: songs
        });
      })
      .catch(error => alert(JSON.stringify(error)));
  };

  return (
    <SafeAreaView>
      {albums && (
        <FlatList
          style={{ marginTop: 10 }}
          data={albums}
          numColumns={2}
          keyExtractor={album => album.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() => showTracks(item)}>
                <View style={styles.imgContainer}>
                  <Image
                    source={{ uri: "file://" + item.cover }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 8
                    }}></Image>
                </View>
                <View style={{ maxHeight: 60 }}>
                  <Text numberOfLines={2} style={styles.title}>
                    {item.album}
                  </Text>
                  <Text numberOfLines={2} style={styles.subtitle}>
                    {item.author}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2,
    flex: 1,
    position: "relative"
  },
  imgContainer: {
    width: "100%",
    height: 180,
    maxWidth: 250,
    paddingHorizontal: 8
  },

  title: {
    textAlign: "center",
    borderRadius: 6
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.8
  }
});

export default AlbumsScreen;

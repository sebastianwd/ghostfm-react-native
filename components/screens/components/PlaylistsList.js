import React, { useEffect, useState, memo } from "react";
import { Text } from "react-native-paper";
import { useStorage } from "../../misc/hooks/useStorage";
import { defaultPlaylist } from "../../misc/Utils";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native";

export const PlaylistsList = memo(({ reload = false, onPress }) => {
  const [state, setPlaylists] = useState([]);
  const { store } = useStorage();

  const getPlaylists = async () => {
    let playlists = await store.get("playlists");
    if (!playlists) {
      store.set("playlists", JSON.stringify(defaultPlaylist));
      setPlaylists(defaultPlaylist);
    } else {
      setPlaylists(JSON.parse(playlists));
    }
  };

  useEffect(() => {
    getPlaylists();
  }, [reload]);

  return (
    <>
      <ScrollView>
        {state.length > 0 &&
          state.map((item, index) => {
            return (
              <View
                key={item.id}
                style={styles.playlistItem}
                onPress={() => onPress(item)}>
                <Icon
                  name='playlist-music-outline'
                  color='white'
                  size={24}
                  style={{ alignSelf: "center", marginHorizontal: 12 }}
                />
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.subtitle}>
                    {item.tracks.length} tracks
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  playlistItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: "row"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "200",
    color: "#d1d1d1b7"
  }
});

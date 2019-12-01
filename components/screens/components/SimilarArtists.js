import React, { useEffect, useState } from "react";
import useApi from "../../misc/hooks/useApi";
import { Text, Surface } from "react-native-paper";
import {
  Dimensions,
  View,
  StyleSheet,
  ImageBackground,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import NavigationService from "../../misc/NavigationService";
import { FALLBACK_ALBUM_COVER } from "../../misc/Utils";

const { width, height } = Dimensions.get("window");

export const SimilarArtists = props => {
  const { artistName } = props;
  const [similarArtist, setSimilarArtist] = useState();

  const { getSimilarByArtistName } = useApi();

  useEffect(() => {
    getSimilarByArtistName(artistName).then(results => {
      setSimilarArtist(results);
    });
  }, [artistName]);

  const handlePress = artistName => {
    NavigationService.navigate("Artist", { artistName });
  };

  return (
    <>
      {similarArtist && (
        <View style={styles.container}>
          {similarArtist.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.surface}
                key={index}
                onPress={() => handlePress(item.strArtist)}>
                <View style={styles.imgContainer}>
                  <ImageBackground
                    source={{
                      uri: item.strArtistThumb || FALLBACK_ALBUM_COVER
                    }}
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                    resizeMode={"cover"}></ImageBackground>
                </View>
                <LinearGradient
                  colors={["#11111157", "#111111bb"]}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.title}>{item.strArtist}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: "100%",
    height: "100%"
  },
  surface: {
    padding: 6,
    height: 90,
    width: width / 2,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    position: "relative"
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  title: {
    textAlign: "center",
    position: "absolute",
    backgroundColor: "#111111e1",
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 6
  }
});

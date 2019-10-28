import React, {useState, useEffect} from 'react';
import {Text, Button, List, Avatar, TouchableRipple} from 'react-native-paper';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {withTheme} from 'react-native-paper';
import {StyleSheet, PermissionsAndroid} from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import {DeviceEventEmitter} from 'react-native';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import {RNAndroidAudioStore} from 'react-native-get-music-files';
import SafeAreaView from 'react-native-safe-area-view';
import Snackbar from 'react-native-snackbar';

const HomeScreen = props => {
  const {colors} = props.theme;
  const [tracks, setSongs] = useState([]);

  const styles = StyleSheet.create({
    view: {
      backgroundColor: colors.background,
    },
  });

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ],
        {
          title: 'Permission',
          message: 'Storage access is requiered',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        alert('You can use the package');
      } else {
        requestPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getAll = () => {
    Snackbar.show({
      title: 'Loading songs...',
      duration: Snackbar.LENGTH_LONG,
      action: {
        title: 'Dismiss',
        color: 'green',
      },
    });
    RNAndroidAudioStore.getAll({
      blured: true, // works only when 'cover' is set to true
      artist: true,
      duration: true, //default : true
      cover: true, //default : true,
      genre: true,
      title: true,
      cover: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
      batchNumber: 5,
      delay: 800,
    }).catch(er => alert(JSON.stringify(error)));
  };

  useEffect(() => {
    requestPermission();

    DeviceEventEmitter.addListener('onBatchReceived', params => {
      console.log(tracks);
      setSongs(tracks => [...tracks, ...params.batch]);
    });

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  return (
    <ScrollView style={styles.view}>
      <Button mode="contained" onPress={getAll}>
        Load audio files
      </Button>
      <SafeAreaView style={{flex: 1}}>
        {tracks.length > 0 && (
          <FlatList
            data={tracks}
            renderItem={({item}) => (
              <TouchableRipple rippleColor="rgba(20, 20, 40, 0.8)">
                <List.Item
                  title={`${item.title || ''}`}
                  description={`${item.author || ''}`}
                  left={props => (
                    <Avatar.Image
                      {...props}
                      size={48}
                      source={{uri: item.cover}}
                    />
                  )}></List.Item>
              </TouchableRipple>
            )}
            keyExtractor={item => item.title}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default withTheme(HomeScreen);

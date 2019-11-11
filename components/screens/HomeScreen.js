import React, {useState, useEffect} from 'react';
import {Text, Button, List, Avatar, TouchableRipple} from 'react-native-paper';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {withTheme} from 'react-native-paper';
import MusicFiles from 'react-native-get-music-files';
import {DeviceEventEmitter} from 'react-native';
import {RNAndroidAudioStore} from 'react-native-get-music-files';
import SafeAreaView from 'react-native-safe-area-view';
import Snackbar from 'react-native-snackbar';
import {useStorage} from '../misc/hooks/useStorage';
import {requestPermission} from '../misc/permissions';

const HomeScreen = props => {
  const {colors} = props.theme;
  const [tracks, setSongs] = useState([]);

  const {store} = useStorage();

  const getAll = async () => {
    Snackbar.show({
      title: 'Loading songs...',
      duration: Snackbar.LENGTH_LONG,
      action: {
        title: 'Dismiss',
        color: 'green',
      },
    });
    RNAndroidAudioStore.getAll({
      id: true,
      artist: true,
      duration: true, //default : true
      cover: true, //default : true,
      genre: true,
      title: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
      batchNumber: 100,
      delay: 800,
    }).catch(er => alert(JSON.stringify(error)));
  };

  const checkExistingSongs = async () => {
    let localSongs = await store.get('songs');
    if (localSongs) {
      setSongs(JSON.parse(localSongs));
      return;
    }
    DeviceEventEmitter.addListener('onBatchReceived', params => {
      setSongs(tracks => [...tracks, ...params.batch]);
    });

    getAll();
  };

  useEffect(() => {
    requestPermission();

    checkExistingSongs();

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  DeviceEventEmitter.addListener('onLastBatchReceived', params => {
    store.remove('songs').then(() => {
      store.set('songs', JSON.stringify(tracks));
    });
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
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
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default withTheme(HomeScreen);

import {useStoreActions, useStoreState, useStore} from 'easy-peasy';
import {State, updateMetadataForTrack} from 'react-native-track-player';
import {
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player/index';
import TrackPlayer from 'react-native-track-player';
import React, {useState} from 'react';
import useApi from './useApi';

const useMusicPlayer = () => {
  const {getMP3, getTrackInfo} = useApi();

  const playbackState = usePlaybackState();

  const store = useStore();
  const playerState = useStoreState(state => state.player);

  const isPlaying = playbackState === STATE_PLAYING;

  /* player actions */
  const updateArtwork = useStoreActions(
    actions => actions.player.updateArtwork,
  );
  const updateTrackInfo = useStoreActions(
    actions => actions.player.updateTrackInfo,
  );
  const playTrack = useStoreActions(actions => actions.player.playTrack);

  const handlePlayPause = async () => {
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    if (!currentTrackId) {
      return;
    }
    isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
  };

  const setQueue = useStoreActions(actions => actions.player.setQueue);

  const updateMetadata = async ({id, ...trackData}) => {
    const trackInfo = await getTrackInfo(trackData.artist, trackData.title);
    /*const mp3Url = await getMP3(`${trackData.artist} ${trackData.title}`);
    trackData.url = mp3Url[0];*/
    /*  console.log('trackInfo', trackInfo);
    console.log('trackData', trackData);*/
    if (trackInfo) {
      updateMetadataForTrack(id, {...trackData, artwork: trackInfo.url});
      updateTrackInfo({id, ...trackData, artwork: trackInfo.url});
    }
  };

  return {
    updateMetadata,
    updateArtwork,
    handlePlayPause,
    playerState,
    playTrack,
    isPlaying,
    setQueue,
  };
};

export default useMusicPlayer;

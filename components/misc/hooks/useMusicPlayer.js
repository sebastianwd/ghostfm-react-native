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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  const playTrack = useStoreActions(actions => actions.player.playTrack);

  const handlePlayPause = async () => {
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    if (!currentTrackId) {
      return;
    }
    isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
  };

  const updateMetadata = async (id, trackData) => {
    const trackInfo = await getTrackInfo(trackData.artist, trackData.title);

    if (trackInfo) {
      updateMetadataForTrack(id, {...trackData, artwork: trackInfo.url});
      updateArtwork(trackInfo.url);
    }
  };

  const setQueue = useStoreActions(actions => actions.player.setQueue);

  const playPrev = () => {
    let playlistState = store.getState().playlist;
    let queue = playlistState.queue;
    if (queue && queue.length > 0) {
      const prevTrack = playlistState.prevTrack.track;
      const prevArtist = playlistState.prevTrack.artist;

      getMP3(`${prevArtist} ${prevTrack}`).then(mp3Url => {
        const trackData = {
          id: getRandomInt(1, 99999),
          url: mp3Url[0],
          title: trackName,
          artist: artistName,
        };

        playTrack(trackData);
        updateMetadata(item.id, trackData);
      });
    }
  };

  const playNext = () => {
    let playlistState = store.getState().playlist;
    let queue = playlistState.queue;
    if (queue && queue.length > 0) {
      const nextTrack = playlistState.nextTrack.track;
      const nextArtist = playlistState.nextTrack.artist;
      console.log('nextArtist', nextArtist);
      console.log('nextTrack', nextTrack);

      getMP3(`${nextArtist} ${nextTrack}`).then(mp3Url => {
        const trackData = {
          id: getRandomInt(1, 99999),
          url: mp3Url[0],
          title: trackName,
          artist: artistName,
        };

        playTrack(trackData);
        updateMetadata(item.id, trackData);
      });
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
    playPrev,
    playNext,
  };
};

export default useMusicPlayer;

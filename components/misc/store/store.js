import {createStore, computed, actionOn, action, memo} from 'easy-peasy';
import TrackPlayer from 'react-native-track-player';

const userModel = {
  userId: null,
};

const playerModel = {
  id: '',
  url: '',
  title: '',
  artist: '',
  artwork: '',
  playTrack: action((state, payload) => {
    state.id = payload.id;
    state.url = payload.url;
    state.title = payload.title;
    state.artist = payload.artist;
    state.artwork = 'https://i.imgur.com/CzL8ax6.jpg';
    payload.artwork = 'https://i.imgur.com/dRsOviF.png';
    console.log(payload);
    TrackPlayer.add([payload]).then(() => {
      TrackPlayer.skipToNext();
      TrackPlayer.play();
      console.log('track playing...');
    });
  }),
};

const playlistModel = {
  queue: [],
};

const storeModel = {
  player: playerModel,
  playlist: playlistModel,
};

const store = createStore(storeModel);

export default store;

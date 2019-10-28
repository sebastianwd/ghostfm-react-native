import {createStore, computed, actionOn, action, memo} from 'easy-peasy';
import TrackPlayer from 'react-native-track-player';
import {composeWithDevTools} from 'remote-redux-devtools';

const fallbackArtwork = 'https://i.imgur.com/dWF1FAo.png';

const playerModel = {
  queue: [],
  current: {
    id: '',
    title: '',
    url: '',
    artist: '',
    artwork: '',
  },
  playTrack: action((state, payload) => {
    state.current.id = payload.id;
    state.current.url = payload.url;
    state.current.title = payload.title;
    state.current.artist = payload.artist;

    payload.artwork = fallbackArtwork;
    state.current.artwork = payload.artwork;

    TrackPlayer.reset().then(() => {
      TrackPlayer.add([payload]).then(() => {
        TrackPlayer.play();
      });
    });
  }),
  updateArtwork: action((state, payload) => {
    state.current.artwork = payload;
  }),
  setQueue: action((state, payload) => {
    let queue = payload.map(({artist, name}, index) => {
      return {index: index, artist: artist.strArtist, track: name};
    });
    console.log('queue', queue);
    state.queue = queue;
  }),
  nextTrack: computed(state => {
    if (!state.queue || !state.current.title) {
      return null;
    }
    const currentTrackIndex = state.queue.findIndex(
      item => item.track === state.current.title,
    );
    const nextTrack = state.queue[currentTrackIndex + 1];
    if (!nextTrack) {
      return null;
    }
    return nextTrack;
  }),
  prevTrack: computed(state => {
    if (!state.queue || !state.current.title) {
      return null;
    }
    const currentTrackIndex = state.queue.findIndex(
      item => item.track === state.current.title,
    );
    const prevTrack = state.queue[currentTrackIndex - 1];
    if (!prevTrack) {
      return null;
    }
    return prevTrack;
  }),
};

const storeModel = {
  player: playerModel,
};
const store = createStore(storeModel, {
  compose: composeWithDevTools({realtime: true, trace: true}),
});

//const store = createStore(storeModel,);

export default store;

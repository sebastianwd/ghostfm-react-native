import {createStore, computed, actionOn, action, memo} from 'easy-peasy';

const userModel = {
  userId: null,
};

const playerModel = {
  url: null,

  playing: false,
  controls: false,
  played: 0,
  duration: 0,
  loop: false,
  playTrack: action((state, payload) => {
    state.played = 0;
    state.url = `https://www.youtube.com/watch?v=${payload.videoId}`;
    state.loaded = 0;
    state.playing = true;
  }),
};

const playlistModel = {
  queue: [],
  current: {
    image: '',
    track: '',
    artist: '',
    album: '',
  },
  onPlay: actionOn(
    (actions, storeActions) => storeActions.player.playTrack,
    (state, target) => {
      state.current = target.payload.current;
    },
  ),

  /*{
    track: trackName,
    artist: artistName,
  }*/
  nextTrack: computed(state => {
    if (!state.queue || !state.current.track) {
      return null;
    }
    const currentTrackIndex = state.queue.findIndex(
      item => item.track === state.current.track,
    );
    const nextTrack = state.queue[currentTrackIndex + 1];
    if (!nextTrack) {
      return null;
    }
    return nextTrack;
  }),
  prevTrack: computed(state => {
    if (!state.queue || !state.current.track) {
      return null;
    }
    const currentTrackIndex = state.queue.findIndex(
      item => item.track === state.current.track,
    );
    const prevTrack = state.queue[currentTrackIndex - 1];
    if (!prevTrack) {
      return null;
    }
    return prevTrack;
  }),
  setQueue: action((state, payload) => {
    let queue = payload.tracks.map(({artist, name}, index) => {
      return {index: index, artist: artist.strArtist, track: name};
    });
    state.queue = queue;
  }),
};

const storeModel = {
  player: playerModel,
  playlist: playlistModel,
};

const store = createStore(storeModel);

export default store;

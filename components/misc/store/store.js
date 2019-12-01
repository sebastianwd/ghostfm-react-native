import { createStore, computed, actionOn, action, memo } from "easy-peasy";
import TrackPlayer from "react-native-track-player";
import { composeWithDevTools } from "remote-redux-devtools";
import { useStorage } from "../hooks/useStorage";

const fallbackArtwork = "https://i.imgur.com/dWF1FAo.png";

const playerModel = {
  queue: [],
  current: {
    id: "",
    title: "",
    url: "",
    artist: "",
    artwork: ""
  },
  random: false,
  manual: false,
  playTrack: action((state, payload) => {
    state.current.id = payload.id;
    state.current.url = payload.url;
    state.current.title = payload.title;
    state.current.artist = payload.artist;
    state.current.artwork = payload.artwork || fallbackArtwork;
  }),
  updateTrackInfo: action((state, payload) => {
    state.current.id = payload.id;
    state.current.url = payload.url;
    state.current.title = payload.title;
    state.current.artist = payload.artist;
    state.current.artwork = payload.artwork || fallbackArtwork;
  }),
  updateArtwork: action((state, payload) => {
    state.current.artwork = payload;
  }),
  setQueue: action((state, payload) => {
    state.queue = payload;
  })
};

const storeModel = {
  player: playerModel
};
const store = createStore(storeModel, {
  compose: composeWithDevTools({ realtime: true, trace: true })
});

//const store = createStore(storeModel,);

export default store;

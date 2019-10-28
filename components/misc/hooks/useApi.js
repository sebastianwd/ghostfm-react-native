import {useState} from 'react';
import {create} from 'apisauce';

// https://ghostfm.herokuapp.com/
const YOUTUBEDL_URL = 'https://youtubedl-api.herokuapp.com/api/';
const BASE_URL = 'https://ghostfm.herokuapp.com/';

const api = create({
  baseURL: BASE_URL,
  headers: {Accept: 'application/json'},
});

const ytapi = create({
  baseURL: YOUTUBEDL_URL,
  headers: {Accept: 'application/json'},
});

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGoogle = async (endpoint, params) => {
    setIsError(false);
    setIsLoading(true);
    try {
      console.log('useApi', 'fetching: ' + YOUTUBEDL_URL + endpoint);
      const result = await ytapi.get(endpoint, params);
      setIsLoading(false);
      return result.data;
    } catch (error) {
      console.error('useApi', error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  const fetchData = async (endpoint, params) => {
    setIsError(false);
    setIsLoading(true);
    try {
      console.log('useApi', 'fetching: ' + BASE_URL + endpoint);

      const result = await api.get(endpoint, params);
      setIsLoading(false);
      return result.data;
    } catch (error) {
      console.error('useApi', error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  const postData = async (endpoint, data) => {
    setIsError(false);
    setIsLoading(true);
    try {
      console.log('useApi', 'post: ' + BASE_URL + endpoint);
      const result = await api.post(endpoint, data);
      setIsLoading(false);
      return result.data;
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  async function getArtistByName(name) {
    let data = await fetchData('artist', {
      name: name,
    });

    return data;
  }
  async function getTopTracksByArtistName(name) {
    let data = await fetchData('artist/toptracks', {
      name: name,
    });

    return data;
  }
  async function getVideoId(trackName) {
    let data = await fetchData('youtubeid', {
      query: trackName,
    });

    return data;
  }

  async function getLyrics(artistName, trackName) {
    let data = await fetchData('track/lyrics', {
      artist: artistName,
      track: trackName,
    });
    return data;
  }

  async function searchAutocomplete(query) {
    let data = await fetchData('search', {
      query: query,
    });
    return data;
  }

  async function getSimilarByArtistName(artistName) {
    let data = await fetchData('artist/similar', {
      name: artistName,
    });
    return data;
  }

  async function getAlbumsByArtistName(artistName) {
    let data = await fetchData('artist/albums', {
      name: artistName,
    });
    return data;
  }

  async function getAlbumInfo(artistName, albumName) {
    let data = await fetchData('album', {
      artistName: artistName,
      albumName: albumName,
    });
    return data;
  }

  async function getMP3(query) {
    let data = await fetchGoogle('audio', {
      query: query,
    });
    return data;
  }

  async function getImage(query) {
    let data = await fetchGoogle('image', {
      query: query,
    });
    return data;
  }
  async function getTrackInfo(artistName, trackName) {
    let data = await fetchData('track', {
      artist: artistName,
      track: trackName,
      withImage: 'true',
    });
    return data;
  }

  return {
    getImage,
    isLoading,
    isError,
    getArtistByName,
    getTopTracksByArtistName,
    getVideoId,
    getLyrics,
    searchAutocomplete,
    getSimilarByArtistName,
    getAlbumsByArtistName,
    getAlbumInfo,
    getMP3,
    getTrackInfo,
  };
};

export default useApi;

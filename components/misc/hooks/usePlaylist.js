import { getRandomInt } from "../Utils";
import { useStorage } from "./useStorage";

export const usePlaylist = () => {
  const { store } = useStorage();
  /**
     * 
     * @param {String} playlistId 
     * @param {{
          id: String,
          artist: String,
          title: String,
          url: String,
          artwork: String,
          album: String,
          duration: String
        }} trackItem 
     */
  const addToPlaylist = async (playlistId, trackItem) => {
    try {
      let playlists = await store.get("playlists");
      playlists = JSON.parse(playlists);
      let foundIndex = playlists.findIndex(x => x.id == playlistId);
      playlists[foundIndex].tracks.push({
        id: String(getRandomInt()),
        artist: trackItem.artist,
        title: trackItem.title,
        url: trackItem.url,
        artwork: trackItem.artwork,
        album: trackItem.album,
        duration: trackItem.duration
      });
      await store.set("playlists", JSON.stringify(playlists));

      return true;
    } catch (error) {
      return { error };
    }
  };

  /**
   *
   * @param {String} playlistId
   * @param {String} trackItemId
   */
  const removeFromPlaylist = async (playlistId, trackItemId) => {
    try {
      let playlists = await store.get("playlists");
      playlists = JSON.parse(playlists);
      let playlistIndex = playlists.findIndex(x => x.id == playlistId);
      let trackIndex = playlists[playlistIndex].tracks.findIndex(
        x => x.id == trackItemId
      );
      ~trackIndex && playlists[playlistIndex].tracks.splice(trackIndex, 1);
      await store.set("playlists", JSON.stringify(playlists));
      return true;
    } catch (error) {
      return { error };
    }
  };

  return {
    addToPlaylist,
    removeFromPlaylist
  };
};

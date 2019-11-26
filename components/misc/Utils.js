export const percentage = (part, total) => {
  return part / total;
};

export const FALLBACK_MP3 =
  "https://ia601400.us.archive.org/13/items/0917_20191028/0917.mp3";

export const FALLBACK_ALBUM_COVER =
  "https://res.cloudinary.com/dkfobbwsu/image/upload/v1573457149/album-art-placeholder.png";

export let defaultPlaylist = [
  {
    id: 1,
    name: "Favorites",
    tracks: [],
    trackCount: 0
  }
];

export function getRandomInt(min = 1, max = 9999999) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

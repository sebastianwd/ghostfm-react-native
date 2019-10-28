import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';

import TrackItem from './TrackItem';
import {FALLBACK_MP3} from '../../misc/Utils';
import useMusicPlayer from '../../misc/hooks/useMusicPlayer';

const TrackList = ({trackList}) => {
  /*trackList.forEach((track, i) => {
    track.number = (i + 1).toString();
  });*/

  let playlist = trackList.map(({artist, name}, index) => {
    return {
      id: (index + 11).toString(),
      artist: artist.strArtist,
      title: name,
      url: FALLBACK_MP3,
    };
  });

  return (
    <React.Fragment>
      <SafeAreaView>
        {trackList && (
          <FlatList
            data={playlist}
            renderItem={({item}) => (
              <TrackItem item={item} trackList={playlist}></TrackItem>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default TrackList;

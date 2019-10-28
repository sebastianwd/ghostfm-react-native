import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';

import TrackItem from './TrackItem';
import useMusicPlayer from '../../misc/hooks/useMusicPlayer';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const TrackList = ({trackList}) => {
  trackList.forEach((track, i) => {
    track.id = getRandomInt(1, 99999).toString();
    track.number = (i + 1).toString();
  });

  const {setQueue} = useMusicPlayer();

  const onPlay = () => {
    setQueue(trackList);
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        {trackList && (
          <FlatList
            data={trackList}
            renderItem={({item}) => (
              <TrackItem item={item} onPlay={onPlay}></TrackItem>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default TrackList;

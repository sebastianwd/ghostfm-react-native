import React from 'react';
import {List, TouchableRipple, Text} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import TrackItem from './TrackItem';

const TrackList = ({trackList}) => {
  trackList.forEach((track, i) => {
    track.id = (i + 1).toString();
  });

  return (
    <React.Fragment>
      <SafeAreaView>
        {trackList && (
          <FlatList
            data={trackList}
            renderItem={({item}) => <TrackItem item={item}></TrackItem>}
            keyExtractor={item => item.id}
          />
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 3,
  },
  itemNumber: {
    alignSelf: 'center',
  },
  itemContainer: {
    borderWidth: 1,
  },
});

export default TrackList;

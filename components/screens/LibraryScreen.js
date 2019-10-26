import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import TopNav from '../ui/TopNav';

const LibraryScreen = () => {
  return (
    <ScrollView>
      <TopNav></TopNav>
      <Text> library </Text>
    </ScrollView>
  );
};

export default LibraryScreen;

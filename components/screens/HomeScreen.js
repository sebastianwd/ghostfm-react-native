import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import Player from './components/Player';

const HomeScreen = () => {
  return (
    <ScrollView>
      <Text style={{height: 3000}}> home </Text>
    </ScrollView>
  );
};

export default HomeScreen;

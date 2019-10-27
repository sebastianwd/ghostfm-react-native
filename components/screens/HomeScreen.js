import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import Player from './components/Player';
import {withTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const HomeScreen = props => {
  const {colors} = props.theme;

  const styles = StyleSheet.create({
    view: {
      backgroundColor: colors.background,
    },
  });

  return (
    <ScrollView style={styles.view}>
      <Text style={{height: 3000}}> home </Text>
    </ScrollView>
  );
};

export default withTheme(HomeScreen);

import React, {useState} from 'react';
import MiniPlayer from '../screens/components/MiniPlayer/Player';
import {BottomTabBar} from 'react-navigation-tabs';
import {withTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import NavigationService from '../misc/NavigationService';

const BottomNav = ({theme, ...otherProps}) => {
  const {colors} = theme;

  const styles = StyleSheet.create({
    player: {
      backgroundColor: colors.background,
    },
    bottomNav: {
      backgroundColor: '#1a1a1b',
    },
  });

  const handlePress = () => {
    NavigationService.navigate('Player');
    console.log('pressed');
  };
  return (
    <React.Fragment>
      <MiniPlayer style={styles.player} onPress={handlePress}></MiniPlayer>
      <BottomTabBar {...otherProps} style={styles.bottomNav} />
    </React.Fragment>
  );
};

export default withTheme(BottomNav);

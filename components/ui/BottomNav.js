import React, {useState} from 'react';
import Player from '../screens/components/Player';
import {BottomTabBar} from 'react-navigation-tabs';
import {withTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const BottomNav = ({theme, ...otherProps}) => {
  const {colors} = theme;

  const styles = StyleSheet.create({
    player: {
      backgroundColor: colors.background,
    },
    bottomNav: {
      backgroundColor: colors.background,
    },
  });

  return (
    <React.Fragment>
      <Player style={styles.player}></Player>
      <BottomTabBar {...otherProps} style={styles.bottomNav} />
    </React.Fragment>
  );
};

export default withTheme(BottomNav);

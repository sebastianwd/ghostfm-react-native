import {useStoreActions, useStoreState, useStore} from 'easy-peasy';

const useMusicPlayer = () => {
  const playTrack = useStoreActions(actions => actions.player.playTrack);

  return {
    playTrack,
  };
};

export default useMusicPlayer;

import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LocalContextMenu } from "./LocalContextMenu";
import RBSheet from "react-native-raw-bottom-sheet";
import TrackPlayer from "react-native-track-player";
import useMusicPlayer from "../../../misc/hooks/useMusicPlayer";

const RenderMenu = props => {
  const { isOpen, trackItem, onClose, playlistId, reload } = props;
  const btmSheetRef = useRef();

  useEffect(() => {
    if (isOpen) {
      btmSheetRef.current && btmSheetRef.current.open();
    }
  }, [isOpen]);

  return (
    <RBSheet
      onClose={onClose}
      ref={btmSheetRef}
      height={250}
      duration={250}
      customStyles={{
        container: {
          justifyContent: "flex-start",
          alignItems: "stretch",
          backgroundColor: "#1a1a1b"
        }
      }}>
      <LocalContextMenu
        onClose={onClose}
        item={trackItem}
        playlistId={playlistId}
        reload={reload}></LocalContextMenu>
    </RBSheet>
  );
};

export const LocalTrackItem = props => {
  const { item, playlistId, reload, trackList } = props;
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const playTrack = () => {
    TrackPlayer.reset().then(() => {
      let queue = trackList();
      TrackPlayer.add(queue).then(() => {
        TrackPlayer.skip(item.id).then(() => {
          TrackPlayer.play();
        });
      });
    });
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <List.Item
          onPress={playTrack}
          title={`${item.title || ""}`}
          description={`${item.artist || ""}`}
          style={{ width: "85%" }}
          left={props => (
            <FastImage
              {...props}
              style={{ width: 48, height: 48, borderRadius: 24 }}
              source={{
                uri: item.artwork,
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}></List.Item>

        <TouchableOpacity onPress={openSheet}>
          <List.Icon icon='dots-vertical' />
        </TouchableOpacity>
        {isOpen && (
          <RenderMenu
            trackItem={item}
            isOpen={isOpen}
            onClose={onClose}
            playlistId={playlistId}
            reload={reload}></RenderMenu>
        )}
      </View>
    </>
  );
};

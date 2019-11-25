import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LocalContextMenu } from "./LocalContextMenu";
import RBSheet from "react-native-raw-bottom-sheet";

const RenderMenu = ({ isOpen, trackItem, onClose }) => {
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
      <LocalContextMenu item={trackItem}></LocalContextMenu>
    </RBSheet>
  );
};

export const LocalTrackItem = props => {
  const { item, playTrack } = props;
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <List.Item
          onPress={() => playTrack(item)}
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
            onClose={onClose}></RenderMenu>
        )}
      </View>
    </>
  );
};

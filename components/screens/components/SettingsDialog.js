import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Portal, Dialog, Paragraph, Button, List } from "react-native-paper";
import NavigationService from "../../misc/NavigationService";

export const SettingsDialog = props => {
  const [isOpen, setIsOpen] = useState();
  const { onRefresh } = props;

  const showDialog = () => {
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
  };

  const handlePress = () => {
    hideDialog();
    NavigationService.navigate("Settings");
  };

  const reloadAudioFiles = () => {
    hideDialog();
    onRefresh();
  };

  return (
    <>
      <TouchableOpacity onPress={showDialog}>
        <AntDesign
          name={"setting"}
          size={24}
          style={{
            color: "white",
            paddingHorizontal: 12,
            paddingVertical: 8
          }}></AntDesign>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={isOpen} onDismiss={hideDialog}>
          <Dialog.Title>Options</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title='Reload audio files'
              onPress={reloadAudioFiles}
              left={props => <List.Icon {...props} icon='refresh' />}
            />
            <List.Item
              title='Settings'
              left={props => <List.Icon {...props} icon='settings' />}
              onPress={handlePress}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

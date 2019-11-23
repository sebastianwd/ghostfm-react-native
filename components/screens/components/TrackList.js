import React, { useRef, useState } from "react";
import { FlatList } from "react-native";
import TrackItem from "./TrackItem";
import { FALLBACK_MP3 } from "../../misc/Utils";
import useMusicPlayer from "../../misc/hooks/useMusicPlayer";
import RBSheet from "react-native-raw-bottom-sheet";
import { Text, Drawer } from "react-native-paper";
import { ContextMenu } from "./ContextMenu";

const TrackList = ({ trackList }) => {
  /*trackList.forEach((track, i) => {
    track.number = (i + 1).toString();
  });*/

  const [currentTrackOptions, setState] = useState();

  const btmSheetRef = useRef();

  let playlist = trackList.map(({ artist, name }, index) => {
    return {
      id: (index + 11).toString(),
      artist: artist.strArtist,
      title: name,
      url: FALLBACK_MP3
    };
  });

  const openSheet = item => {
    btmSheetRef.current.open();
    setState(item);
  };

  return (
    <React.Fragment>
      {trackList && (
        <>
          <FlatList
            data={playlist}
            renderItem={({ item }) => (
              <TrackItem
                item={item}
                trackList={playlist}
                openSheet={openSheet}></TrackItem>
            )}
            keyExtractor={item => item.id}
          />
          <RBSheet
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
            {currentTrackOptions && (
              <ContextMenu item={currentTrackOptions}> </ContextMenu>
            )}
          </RBSheet>
        </>
      )}
    </React.Fragment>
  );
};

export default TrackList;

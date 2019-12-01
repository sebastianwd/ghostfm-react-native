/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
import { LocalTrackItem } from "./LocalTrackItem";
import TrackPlayer from "react-native-track-player";

const ViewTypes = {
  FULL: 0
};

export class LocalTrackList extends React.PureComponent {
  constructor(args) {
    super(args);

    let { width } = Dimensions.get("window");

    //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
    let dataProvider = new DataProvider((r1, r2) => {
      return r1.id !== r2.id;
    });

    //Create the layout provider
    this._layoutProvider = new LayoutProvider(
      index => {
        return ViewTypes.FULL;
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.FULL:
            dim.width = width;
            dim.height = 70;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows(
        this._dataFormat(this.props.tracks)
      )
    };
  }

  trackList() {
    return this._dataFormat(this.props.tracks);
  }
  /*
  playTrack(track) {
    TrackPlayer.reset().then(() => {
      TrackPlayer.add(this.trackList()).then(() => {
        TrackPlayer.skip(track.id).then(() => {
          TrackPlayer.play();
        });
      });
    });
  }*/

  _dataFormat(tracks) {
    return tracks.map(item => {
      /* if item is already formatted, i.e. when loading saved playlist items */
      if (item.artist) {
        return item;
      }
      return {
        id: String(item.id),
        artist: item.author,
        title: item.title,
        url: item.path,
        artwork: item.cover,
        album: item.album,
        duration: item.duration
      };
    });
  }

  //Given type and data return the view component
  _rowRenderer(type, data) {
    //You can return any view here, CellContainer has no special significance
    switch (type) {
      case ViewTypes.FULL:
        return (
          <LocalTrackItem
            trackList={this.trackList.bind(this)}
            item={data}
            /* playTrack={this.playTrack.bind(this)}*/
            playlistId={this.props.playlistId}
            reload={this.props.reload}></LocalTrackItem>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <RecyclerListView
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
      />
    );
  }
}

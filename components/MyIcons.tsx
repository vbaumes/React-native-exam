import { StyleSheet, Share, Platform } from 'react-native';
import React from 'react';
import { View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { MyButton } from './MyButton';
import MyBottomSheet from './MyBottomSheet';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

type IconsComponentProps = {
    uri: string
};

const MyIcons: React.FunctionComponent<IconsComponentProps> = ({uri}) => {
  const saveInAlbum = async () => {
    const ALBUM_NAME = 'Album test';
    let album: any = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
    if(!album) {
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log(asset);
      album = MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, false)
        .catch(e => {
          console.log(e);
        });
    } else {
      MediaLibrary.createAssetAsync(uri)
        .then(asset =>  MediaLibrary.addAssetsToAlbumAsync(asset, album, false))
        .catch(e => {
          console.log(e);
        });
    }
  }

  const saveInCloud = async () => {
    const formData = new FormData();
    const uriToSend = Platform.OS === 'ios' ? uri.split('file://')[1] : uri;
    const image = { name:'picture', type:'image/jpg', uri: uriToSend };

    // @ts-ignore
    formData.append('photo', image );

    await axios.patch('http://10.50.37.166:7070/multipart-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: () => {
        return formData; // this is doing the trick
      }
    });
  }

  const onSave = async () => {
    saveInAlbum();
    saveInCloud();
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        url: uri,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };   

  return (
    <View style={styles.container}>
      <MyButton icon={<AntDesign name="download" size={20} color="black" />} style={{}} onPressFunction={onSave} />
      <MyButton icon={<AntDesign name="cloudupload" size={24} color="black" />} style={{marginHorizontal: 5}} onPressFunction={onShare} />
      <MyBottomSheet uri={uri} />
    </View>
  );
}

export default MyIcons;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 12
  }
});
import { StyleSheet, Image, FlatList, Share } from 'react-native';
import React from 'react';
import { View } from '../components/Themed';
import { CapturedPicture } from 'expo-camera/build/Camera.types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AntDesign } from '@expo/vector-icons';
import { MyButton } from './MyButton';
import MyBottomSheet from './MyBottomSheet';

const MyPictures: React.FunctionComponent = ({}) => {
  const pictures =  useSelector((state: RootState) => {
    return state.pictures.map((value) => {
      return JSON.parse(value);
    })
  });

  const renderPictures: React.FunctionComponent <{item: CapturedPicture}> = ({item}) => {
    const onShare = async () => {
      try {
        const result = await Share.share({
          url: item.uri,
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
      <View>
        <Image source={{uri: item.uri}} style={styles.thumb} />
        <View style={styles.iconsContainer}>
            <MyBottomSheet uri={item.uri} />
            <MyButton icon={<AntDesign name="cloudupload" size={30} color="black" />} style={styles.deleteButton} onPressFunction={onShare} />
        </View>
      </View>
    );
  }

  return (
    <View>
        <FlatList 
          horizontal
          contentContainerStyle={styles.container}
          data={pictures}
          renderItem={renderPictures}
          keyExtractor={(item) => item.uri}
        />
    </View>
  );
}

export default MyPictures;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginHorizontal: 10
    },
    thumb: {
      marginRight: 5,
      marginBottom: 10,
      width: 80,
      height: 100,
      borderColor: 'black',
      borderWidth: 1
    },
    iconsContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    deleteButton: {
      margin: 5
    },
});
import { StyleSheet, Image, FlatList } from 'react-native';
import React from 'react';
import { View } from '../components/Themed';
import { CapturedPicture } from 'expo-camera/build/Camera.types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const MyPictures: React.FunctionComponent = ({}) => {
  const pictures =  useSelector((state: RootState) => {
    return state.pictures.map((value) => {
      return JSON.parse(value);
    })
  });

  const renderPictures: React.FunctionComponent <{item: CapturedPicture}> = ({item}) => {
    return <Image source={{uri: item.uri}} style={styles.thumb} />
  }

  return (
    <View>
        <FlatList 
          horizontal
          contentContainerStyle={styles.container}
          data={pictures}
          renderItem={renderPictures}
          keyExtractor={(item) => 'picture_' + item.uri}
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
});
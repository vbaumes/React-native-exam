import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { View } from './Themed';
import MyIcons from './MyIcons';

type PicturesComponentProps = {
    item: any
};

const MyPictures: React.FunctionComponent<PicturesComponentProps> = ({item}) => {
  return (
    <View>
      <Image source={{uri: item.uri}} style={styles.thumb} />
      <MyIcons uri={item.uri} />
    </View>
  );
}

export default MyPictures;

const styles = StyleSheet.create({
    thumb: {
      marginRight: 5,
      marginBottom: 10,
      width: 100,
      height: 150,
      borderColor: 'black',
      borderWidth: 1
    }, 
});
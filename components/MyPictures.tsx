import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { View } from './Themed';
import MyIcons from './MyIcons';

type PicturesComponentProps = {
    item: any
};

const MyPictures: React.FunctionComponent<PicturesComponentProps> = ({item}) => {
    console.log(item);
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
      width: 80,
      height: 100,
      borderColor: 'black',
      borderWidth: 1
    }, 
});
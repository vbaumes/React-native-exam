import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { View } from './Themed';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import MyPictures from './MyPictures';

const MyGallery: React.FunctionComponent = ({}) => {
  const pictures =  useSelector((state: RootState) => {
    return state.pictures.map((value) => {
      return JSON.parse(value);
    })
  });

  return (
    <View>
        <FlatList 
          horizontal
          contentContainerStyle={styles.container}
          data={pictures}
          renderItem={(element) =><MyPictures item={element.item} />}
          keyExtractor={(item) => item.uri}
        />
    </View>
  );
}

export default MyGallery;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginHorizontal: 10
    },
});
import { StyleSheet } from 'react-native';
import React from 'react';
import { View } from '../components/Themed';
import MyCamera from '../components/MyCamera';
import MyPictures from '../components/MyPictures';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MyCamera />
      <MyPictures />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
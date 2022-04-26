import { StyleSheet } from 'react-native';
import React from 'react';
import { View } from '../components/Themed';
import MyCamera from '../components/MyCamera';
import MyGallery from '../components/MyGallery';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MyCamera />
      <MyGallery />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    position: 'relative'
  },
  button: {
    position: 'absolute',
    flex: 0.1,
    alignItems: 'center',
    left: 15,
    top: 20
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  buttonPhoto: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 40,
    marginBottom: 10
  },
  thumb: {
    width: 100,
    height: 70,
    borderColor: 'blue',
    borderWidth: 1
  },
  buttonGallery: {
    position: 'absolute',
    right: 15,
    bottom: 20
  }
});
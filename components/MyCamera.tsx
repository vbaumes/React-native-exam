import { StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { set_localPictures } from '../store/pictureSlice';
import { useDispatch } from 'react-redux';


export default function MyCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef<Camera | null>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = () => {
    cameraRef.current && cameraRef.current.takePictureAsync({ quality: 0.4 })
      .then(picture =>
        dispatch(set_localPictures(JSON.stringify(picture)))
      )
      .catch(e => console.log('error', e));
  }

  return (
    <Camera style={styles.camera} type={type} ref={(camera) => {cameraRef.current = camera}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.buttonPhoto} />
          <TouchableOpacity onPress={() => console.log('c')} style={styles.buttonGallery} >
            <AntDesign name="picture" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
  );
}

const styles = StyleSheet.create({
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
  buttonGallery: {
    position: 'absolute',
    right: 15,
    bottom: 20
  }
});
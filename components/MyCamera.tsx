import { StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Text, View } from '../components/Themed';
import { set_localPictures } from '../store/pictureSlice';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { MyButton } from './MyButton';


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

  const handleType = () => {
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front: Camera.Constants.Type.back);
  }

  return (
    <Camera style={styles.camera} type={type} ref={(camera) => {cameraRef.current = camera}}>
        <View style={styles.buttonContainer}>
          <MyButton 
            style={styles.button} 
            onPressFunction={handleType} 
            icon={<AntDesign name="retweet" size={30} color="white" />} />
          <MyButton 
            style={styles.buttonPhoto} 
            onPressFunction={takePicture} 
            icon={<AntDesign name="camera" size={30} color="white" />} />
        </View>
      </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    margin: 20
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
    bottom: 20
  },
  buttonPhoto: {
    padding: 10,
    marginBottom: 12
  }
});
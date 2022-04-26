import { StyleSheet, Share } from 'react-native';
import React from 'react';
import { View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { MyButton } from './MyButton';
import MyBottomSheet from './MyBottomSheet';

type IconsComponentProps = {
    uri: string
};

const MyIcons: React.FunctionComponent<IconsComponentProps> = ({uri}) => {
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
        <MyBottomSheet uri={uri} />
        <MyButton icon={<AntDesign name="cloudupload" size={30} color="black" />} style={styles.deleteButton} onPressFunction={onShare} />
      </View>
    );
  }

export default MyIcons;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    deleteButton: {
      margin: 5
    },
});
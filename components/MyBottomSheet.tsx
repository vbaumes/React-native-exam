import React, { useState } from 'react';
import { BottomSheet, ListItem } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { MyButton } from './MyButton';
import { useDispatch } from 'react-redux';
import { delete_picture } from '../store/pictureSlice';

type BottomSheetComponentProps = {
    uri: string
};

const MyBottomSheet: React.FunctionComponent<BottomSheetComponentProps> = (uri) => {
const [isVisible, setIsVisible] = useState(false);
const dispatch = useDispatch();

const handleDelete = () => {
    dispatch(delete_picture(JSON.stringify(uri)));
    setIsVisible(false);
}

const list = [
  { title: 'Supprimer',
    onPress: () => handleDelete()
  },
  {
    title: 'Annuler',
    containerStyle: { backgroundColor: 'red' },
    titleStyle: { color: 'white' },
    onPress: () => setIsVisible(false),
  },
];

return (
  <SafeAreaProvider>
    <MyButton 
        icon={<AntDesign name="delete" size={20} color="red" />} 
        style={styles.iconStyle} 
        onPressFunction={() => setIsVisible(true)} 
    />
    <BottomSheet modalProps={{}} isVisible={isVisible}>
      {list.map((l, i) => (
        <ListItem
          key={i}
          containerStyle={l.containerStyle}
          onPress={l.onPress}
        >
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  </SafeAreaProvider>
);
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 20
  }
});

export default MyBottomSheet;

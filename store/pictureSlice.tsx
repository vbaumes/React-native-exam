import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

let initialState: string[] = [];

export const pictureSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    set_localPictures: (state, action) => {
      const storeData = async () => {
        try {
          if(state.length < 1) {
            state = [action.payload];
          } else {
            state = [...state, action.payload];
          }

          await AsyncStorage.setItem('localPictures', JSON.stringify(state));
        } catch (e) {
          console.log(e);
        }
      }

      storeData();
      return state;
    },
    delete_picture: (state, action) => {
      const newState : any = [];
      state.forEach(picture => {
        console.log('payload', JSON.parse(action.payload).uri);
        console.log('picture', JSON.parse(picture).uri);
        if(JSON.parse(picture).uri != JSON.parse(action.payload).uri) {
          newState.push(picture);
        }
      });

      const updateStore = async () => {
        try {
          state = newState;
          await AsyncStorage.setItem('localPictures', JSON.stringify(state));
        } catch (e) {
          console.log(e);
        }
      }

      updateStore();
      return state;
    },
  },
});
export const { set_localPictures, delete_picture } = pictureSlice.actions;
export const pictureSliceReducer = pictureSlice.reducer;
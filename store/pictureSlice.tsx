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
  },
});
export const { set_localPictures } = pictureSlice.actions;
export const pictureSliceReducer = pictureSlice.reducer;
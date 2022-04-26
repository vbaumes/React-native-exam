`
# Eval expo Virginie BAUMES
## Stack
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

You need to run :

`npm i`

To start you need to run : 

`expo start`

### Usage

You can : 
- switch camera.
- save the picture into redux and local storage.
- You can previsualize the picture.
- You can delete a photo and have a pop to make sure you really want to delete
- You can share the photo when you click on the icon.

### Tools

- AsyncStorage.
- Type with typeScript.
- react-native-elements (BottomSheet)
- expo/@vector-icons (Pictogrammes)
- expo-camera
- expo-sharing
- expo-media-library
- redux-toolkit

### TODO

I wanted to do a component for : 
    <View style={styles.iconsContainer}>
        <MyBottomSheet uri={item.uri} />
        <MyButton icon={<AntDesign name="cloudupload" size={30} color="black" />} style={styles.deleteButton} onPressFunction={onShare} />
    <View>
to reduce the size of MyPictures.tsx
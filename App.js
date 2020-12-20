import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

const App = () => {

  const [uri, setUri] = useState("https://w7.pngwing.com/pngs/998/203/png-transparent-black-and-white-no-to-camera-logo-video-on-demand-retail-website-simple-no-miscellaneous-television-text.png")

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      alert("Permission to camera is needed!.")
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    setUri(pickerResult.uri)
    console.log(pickerResult)
  }

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('This device are not allowed to share things :(')
    } else {
      await Sharing.shareAsync(uri)
    }
  }

  return <View style={styles.container}>
    <Text style={styles.title}>Hola!!</Text>
    <TouchableOpacity onPress={openImagePickerAsync}>
      <Image style={styles.image} source={{ uri }} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={openShareDialog}>
      <Text style={styles.buttonText}>Share it!</Text>
    </TouchableOpacity>
  </View>
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#2657eb",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    margin: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 40
  },
  button: {
    backgroundColor: 'red',
    margin: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 20
  }
}

export default App
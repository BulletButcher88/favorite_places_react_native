import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, StyleSheet, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImgPicker = props => {

  const [pickedImage, setPickedImage] = useState()

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if (result.status !== 'granted') {
      Alert.alert('Insufficient camera access', 'You need granted permission to camera', [{ text: "Okey" }])
      return false;
    }
    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,

    })
    setPickedImage(image.uri)
    props.onImageTaken(image.uri)
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ?
          (<Button title="Select Image" color="orange" onPress={takeImageHandler} />) :
          (<Image style={styles.image} source={{ uri: pickedImage }} />)
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'orange',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default ImgPicker;
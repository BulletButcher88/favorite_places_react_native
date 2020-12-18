import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native';
import ImageSelector from '../components/ImageSelector'
import LocationPicker from '../components/LocationPicker'
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/store.action';

const NewPlacesScreen = props => {
  const [titleValue, setTitleValue] = useState('')
  const [selectImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState()

  const dispatch = useDispatch()

  const titleChangeHandler = text => {
    //add validation here
    setTitleValue(text)
  }

  const imageTakenHandler = imageUri => {
    setSelectedImage(imageUri)
  }

  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location)
  }, [])

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(
      titleValue, 
      selectImage, 
      selectedLocation
      ))
    props.navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Name / Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImageSelector
          onImageTaken={imageTakenHandler}
        />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color="green"
          onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  input: {
    fontSize: 18,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
})

NewPlacesScreen.navigationOptions = navData => {
  return { headerTitle: 'Add place' }
}

export default NewPlacesScreen
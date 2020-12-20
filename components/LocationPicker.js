import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';

import MapPreview from '../components/MapPreview'
import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';


const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false)
  const [location, setLocation] = useState(null);

  const pickedLocation = props.navigation.getParam('pickedLocation')

  const { onLocationPicked } = props;

  useEffect(() => {
    if (pickedLocation) {
      setLocation(pickedLocation)
      onLocationPicked(pickedLocation)
    }
  }, [pickedLocation, onLocationPicked])

  const verifyPermission = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Insufficient location finder', 'You need granted permission to for location', [{ text: "Okey" }])
      return false;
    }
    return true
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return
    }
    try {
      setIsFetching(true)
      const locationResult = await Location.getCurrentPositionAsync({ timeout: 5000 });
      setLocation({
        lat: locationResult.coords.latitude,
        lng: locationResult.coords.longitude
      })
      props.onLocationPicked({
        lat: locationResult.coords.latitude,
        lng: locationResult.coords.longitude
      })
    } catch (err) {
      Alert.alert(
        'Could not find location',
        'Please try again later or select on the map',
        [{ text: "OK" }]
      )
    }

    // props.onImageTaken(location)
    setIsFetching(false)
  }

  const setLocationPin = () => {
    props.navigation.navigate('Map')
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview onPress={setLocationPin} location={location} style={styles.mapView}>
        {isFetching ? <ActivityIndicator size='large' color='orange' /> : <Button title='Get Location' color='orange' onPress={getLocationHandler} />}
      </MapPreview>
      <Button title='Pick location on map' color='orange' onPress={setLocationPin} />
    </View>
  )
};


const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapView: {
    marginBottom: 15,
    width: '100%',
    height: 150,
    borderColor: 'orange',
    borderWidth: 1,
  },
  text: {
    color: 'grey'
  }
})

export default LocationPicker
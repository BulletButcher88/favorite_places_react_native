import React, { useState, useCallback, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps';


const MapScreen = props => {

  const initialLocation = props.navigation.getParam('initialLocation')
  const readonly = props.navigation.getParam('readonly')

  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const imagePreviewUrl = {
    latitude: initialLocation ? initialLocation.lat : -37.813,
    longitude: initialLocation ? initialLocation.lng : 144.96,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07
  };

  const selectionLocationHandler = event => {
    if (readonly) {
      return;
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    })
  }

  const saveLocationPickerHandler = useCallback(
    () => {
      if (!selectedLocation) {
        Alert.alert("Try again", 'Please drop a pin on the location', [{ text: 'OK' }])
        return;
      }
      props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation })
    },
    [selectedLocation],
  )
  useEffect(() => {
    props.navigation.setParams({ saveLocation: saveLocationPickerHandler })
  }, [saveLocationPickerHandler])


  let markerLocation;

  if (selectedLocation) {
    markerLocation = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    }
  }

  return (
    <MapView style={styles.map} initialRegion={imagePreviewUrl} region={markerLocation} onPress={selectionLocationHandler} >
      {selectedLocation && <Marker title="Picker Mark" coordinate={markerLocation} />}
    </MapView>
  )
}

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam('saveLocation')
  const readonly = navData.navigation.getParam('readonly')

  if (readonly) {
    return {};
  }
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: "#444"
  }
})

export default MapScreen;
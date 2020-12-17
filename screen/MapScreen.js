import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';


const MapScreen = props => {

  const [selectedLocation, setSelectedLocation] = useState()

  const imagePreviewUrl = {
    latitude: -37.813,
    longitude: 144.96,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07
  };

  const selectionLocationHandler = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    })
  }

  let markerLocation;

  if (selectedLocation) {
    markerLocation = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }

  return (
    <MapView style={styles.map} region={imagePreviewUrl} onPress={selectionLocationHandler} >
      {selectedLocation && <Marker title="Picker Mark" coordinate={markerLocation} />}
    </MapView>
  )
}

MapScreen.navigationOptions = navData => {
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={() => { }}>
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
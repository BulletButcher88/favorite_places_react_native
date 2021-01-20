import React, { useState } from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// import ENV from '../env';

const MapPreview = props => {

  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = {
      latitude: props.location.lat,
      longitude: props.location.lng,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    };
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapView, ...props.style }}>
      {props.location ?
        <MapView
          {...props}
          maximumZ={19}
          style={styles.mapImage}
          region={imagePreviewUrl}
        >
          <Marker coordinate={imagePreviewUrl}></Marker>
        </MapView> :
        props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mapView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    height: '100%',
    width: '100%'
  }
})


export default MapPreview;
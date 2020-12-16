import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import ENV from '../env';

const MapPreview = props => {


  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = {
      latitude: props.location.lat,
      longitude: props.location.lng,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    };
    //   // imagePreviewUrl = `https://www.google.com/maps/@?api=1&map_action=map&center=${props.location.lat},${props.location.lng}&zoom=12&basemap=terrain&key=${ENV.googleAPIKey}`
    //   imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleAPIKey}`;
  }

  // console.log(imagePreviewUrl)



  return (
    <View style={{ ...styles.mapView, ...props.style }}>
      {props.location ?
        <MapView
          maximumZ={19}
          style={styles.mapImage}
          region={imagePreviewUrl}
        >
          <Marker coordinate={imagePreviewUrl}></Marker>
        </MapView> :
        props.children}
    </View>
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
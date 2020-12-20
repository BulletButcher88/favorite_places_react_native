import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'

import MapPreview from '../components/MapPreview'

const PlaceDetailScreen = props => {
  const itemId = props.navigation.getParam('placeId')
  const placeData = useSelector(state => state.places.places.find(pla => pla.id === itemId))
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: placeData.imageUri }} />
      <Text style={styles.title}>{placeData.title}</Text>


      <View style={styles.locationContainer}>
        <MapPreview style={styles.map} location={{ lat: placeData.lat, lng: placeData.lng }} />
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeData.address}</Text>
        </View>


      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 5,
    fontSize: 27,
    marginHorizontal: 15
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    margin: 10,
    marginVertical: 20,
    width: '100%',
    maxWidth: 350,
    shadowColor: 'grey',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  map: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  address: {
    fontSize: 18,
    textAlign: 'center'
  },
  addressContainer: {
    padding: 10
  }
})

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle')
  }
}

export default PlaceDetailScreen
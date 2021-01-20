import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

import MapPreview from '../components/MapPreview'

const PlaceDetailScreen = props => {
  const itemId = props.navigation.getParam('placeId')
  const placeData = useSelector(state => state.places.places.find(pla => pla.id === itemId))

  const selectedLocation = { lat: placeData.lat, lng: placeData.lng };

  const showMapHandler = () => {
    props.navigation.navigate('Map', { readonly: true, initialLocation: selectedLocation });
  }

  return (
    <ScrollView >
      <View style={styles.scrollView}>
        <Image style={styles.image} source={{ uri: placeData.imageUri }} />
        <Text style={styles.title}>{placeData.title}</Text>
        <TouchableOpacity
          style={styles.locationContainer}
        >

          <MapPreview
            style={styles.map}
            location={selectedLocation}
            onPress={showMapHandler}
          />

          <View style={styles.addressContainer}>
            <Text style={styles.address}>{placeData.address}</Text>
          </View>

        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 2,
    fontSize: 33,
    marginHorizontal: 10
  },
  image: {
    height: '33%',
    minHeight: 280,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 10

  },
  locationContainer: {
    margin: 5,
    marginVertical: 20,
    width: '100%',
    maxWidth: 350,
    shadowColor: 'grey',
    shadowOpacity: 0.38,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  map: {
    width: '100%',
    height: 250,
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
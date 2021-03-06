import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as placesAction from '../store/store.action'

import MapPreview from '../components/MapPreview'

const PlaceDetailScreen = props => {

  const itemId = props.navigation.getParam('placeId')
  const placeData = useSelector(state => state.places.places.find(pla => pla.id === itemId))
  const dispatch = useDispatch()

  const selectedLocation = { lat: placeData.lat, lng: placeData.lng };

  const showMapHandler = () => {
    props.navigation.navigate('Map', { readonly: true, initialLocation: selectedLocation });
  }

  //PlaceListScreen isn't updating after the below is called.
  const deleteHandler = () => {
    dispatch(placesAction.deletePlace(itemId))
    props.navigation.navigate('Places', { loading: true })
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
        <TouchableOpacity
          style={styles.delButton}
          onPress={deleteHandler}
        >
          <Text style={{ color: 'white', fontWeight: '800' }}>Delete</Text>
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
  },
  delButton: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#c91a00',
    top: 30,
    right: 30,
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2
  }
})

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle')
  }
}

export default PlaceDetailScreen
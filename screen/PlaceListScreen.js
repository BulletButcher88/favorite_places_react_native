import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, FlatList, Text } from 'react-native'
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as placesAction from '../store/store.action'


const fetchData = state => {

  const places = useSelector(state => state.places.places)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(state)

  useEffect(() => {
    dispatch(placesAction.loadPlaces())
    setIsLoading(false)
  }, []);
  return { places, isLoading }
}

const PlaceListScreen = props => {
  const loading = props.navigation.getParam('loading')
  const { places, isLoading } = fetchData(loading)

  return (
    <View>
      {!isLoading ?
        <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={itemData =>
            <PlaceItem
              id={itemData.item.id}
              image={itemData.item.imageUri}
              title={itemData.item.title}
              address={itemData.item.address}
              onSelect={() => {
                props.navigation.navigate('PlaceDetail', {
                  plateTitle: itemData.item.title,
                  placeId: itemData.item.id,

                })
              }}
            />
          } /> : <Text>....loading</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: {
    color: 'white'
  }
})

PlaceListScreen.navigationOptions = navData => {
  return {
    headerTitle: "All places",
    headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
      <Item
        title='Add Item'
        color='white'
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        onPress={() => {
          navData.navigation.navigate('NewPlace')
        }} />
    </HeaderButtons>
  }
}

export default PlaceListScreen
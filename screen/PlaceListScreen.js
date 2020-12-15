import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';

const PlaceListScreen = props => {

  const places = useSelector(state => state.places.places)

  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData =>
          <PlaceItem
            image={itemData.item.imageUri}
            title={itemData.item.title}
            address={null}
            onSelect={() => {
              props.navigation.navigate('PlaceDetail', {
                plateTitle: itemData.item.title,
                placeId: itemData.item.id
              })
            }}
          />
        } />
    </View>
  )
}

const styles = StyleSheet.create({

})

PlaceListScreen.navigationOptions = navData => {
  return {
    headerTitle: "All places",
    headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Add Item'
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        onPress={() => {
          navData.navigation.navigate('NewPlace')
        }} />
    </HeaderButtons>
  }
}

export default PlaceListScreen
import React, { useState } from 'react'
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db'
import Geocoder from 'react-native-geocoding';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const FETCH_PLACES = 'FETCH_PLACES';


export const addPlace = (title, image, address) => {
  return async dispatch => {

    let geoAddress;
    Geocoder.init(ENV.googleAPIKey);
    const response = await Geocoder.from(address.lat, address.lng)
      .then(json => {
        if (!json.results) {
          throw new Error('Error: no result response from geocoder API')
        }
        geoAddress = json.results[0].formatted_address
      })
      .catch(error => console.warn(error));

    const fileName = image.split('/').pop()
    console.log(fileName)
    const newFilePath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newFilePath
      })

      const dbResult = await insertPlace(
        title,
        newFilePath,
        geoAddress,
        address.lat,
        address.lng
      )
      dispatch({
        type: ADD_PLACE, placeData: {
          id: dbResult.insertId, title: title, imageUri: newFilePath, address: geoAddress, coords: {
            lat: address.lat,
            lng: address.lng
          }
        }
      })

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};


export const loadPlaces = () => {
  return async dispatch => {

    try {
      const fetchData = await fetchPlaces()
      // console.log(fetchData)
      dispatch({ type: FETCH_PLACES, places: fetchData.rows._array })
    } catch (err) {
      throw err;
    }
  }
}
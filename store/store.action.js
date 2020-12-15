import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db'
export const ADD_PLACE = 'ADD_PLACE';
export const FETCH_PLACES = 'FETCH_PLACES';

export const addPlace = (title, image) => {
  return async dispatch => {
    const fileName = image.split('/').pop()
    const newFilePath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newFilePath
      })
      const dbResult = await insertPlace(
        title,
        newFilePath,
        "Dummy Address",
        15.4,
        13.8
      )
      console.log(dbResult)
      dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newFilePath } })

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
      console.log(fetchData.rows._array)
      dispatch({ type: FETCH_PLACES, places: fetchData.rows._array })
    } catch (err) {
      throw err;
    }
  }
}
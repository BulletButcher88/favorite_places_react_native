import { ADD_PLACE, FETCH_PLACES, DELETE_PLACE } from "./store.action";
import Place from '../model/place';

const initialState = {
  places: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PLACE:
      return {
        places: state.places.filter(pla => pla.id === action.places.id)
      }
    case FETCH_PLACES:
      return {
        places: action.places.map(pl =>
          new Place(
            pl.id.toString(),
            pl.title,
            pl.imageUri,
            pl.address,
            pl.lat,
            pl.lng
          ))
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUri,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng,
      );
      return {
        places: state.places.concat(newPlace)
      };
    default:
      return state;
  }
}
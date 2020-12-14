import { createAppContainer, createStackNavigator } from 'react-navigation'

import MapScreen from '../screen/MapScreen';
import NewPlaceScreen from '../screen/NewPlaceScreen';
import PlaceDetailScreen from '../screen/PlaceDetailScreen';
import PlaceListScreen from '../screen/PlaceListScreen';

const PlaceNavigator = createStackNavigator({
  Places: PlaceListScreen,
  PlaceDetail: PlaceDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'orange'
    },
    headerTintColor: "white",
    headerTitle: "MAP"
  }
}
)

export default createAppContainer(PlaceNavigator)
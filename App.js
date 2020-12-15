import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import placesReducer from './store/store.reducer'
import PlacesNavigator from './navigation/PlacesNavigation'

const rootReducer = combineReducers({
  places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default App = () => {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  )
}

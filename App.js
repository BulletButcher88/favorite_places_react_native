import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import placesReducer from './store/store.reducer'
import PlacesNavigator from './navigation/PlacesNavigation'
import { init } from './helpers/db'

init().then(() => {
  console.log("Initialised database")
})
  .catch(err => {
    console.log("Initialised db failed")
    console.log(err)
  })

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

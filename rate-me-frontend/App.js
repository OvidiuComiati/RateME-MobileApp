import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

import userReducer from './reducers/user'
import UserListNavigator from './navigation/navigator'

const rootReducer = combineReducers({
  users: userReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <UserListNavigator />
    </Provider>
  )
}
 


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen'
import RegistrationScreen from './src/screens/RegistrationScreen'
import HomeScreen from './src/screens/HomeScreen'
import StoreScreen from './src/screens/StoreScreen'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import petsReducer from './src/redux/PetsReducer';
import { db, auth } from './src/firebase/config';
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const Stack = createStackNavigator();
const store = createStore(petsReducer);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if (user) {
          getDoc(doc(db, 'users', user.uid))
          .then((document) => {
              const userData = document.data();
              setLoading(false);
              setUser(userData);
            })
            .catch((error) => {
              setLoading(false);
            });
        } else {
          setLoading(false);
          setUser(null);
        }
      });
    }, []);

    if (loading) {	
      return (	
        <></>	
      )	
    }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          { user ? (
            <>
                <Stack.Screen name="Home">
                  {props => <HomeScreen {...props} extraData = {user}/>}
                </Stack.Screen>
                <Stack.Screen name="Store">
                  {props => <StoreScreen {...props} extraData={user}/>}
                </Stack.Screen>
            </>
          ) : (
            <>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Registration" component={RegistrationScreen}/>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
   </Provider>
  );
};


export default App;

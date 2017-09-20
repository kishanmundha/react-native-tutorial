import React from 'react';
import { View, StatusBar } from 'react-native';

import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import {
  AboutScreen,
  CartScreen,
  CheckoutScreen,
  CheckoutSuccessScreen,
  FeedbackScreen,
  FeedbackSuccessScreen,
  HomeScreen,
} from './screens';  

firebase.initializeApp({
  apiKey: 'AIzaSyBm1NfjkwrWYgeTt4MNOTBQQXK90QLqOnc',
  authDomain: 'fir-474e7.firebaseapp.com',
  databaseURL: 'https://fir-474e7.firebaseio.com',
  projectId: 'fir-474e7',
  storageBucket: 'fir-474e7.appspot.com',
  messagingSenderId: '777123001397'
});

const AppNavigationScreens = StackNavigator({
  Home: { screen: HomeScreen },
  About: { screen: AboutScreen },
  Cart: { screen: CartScreen },
  Checkout: { screen: CheckoutScreen },
  CheckoutSuccess: { screen: CheckoutSuccessScreen },
  Feedback: { screen: FeedbackScreen },
  FeedbackSuccessScreen: { screen: FeedbackSuccessScreen },
}, {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#009688',
    },
  },
  cardStyle: {
    backgroundColor: 'white'
  }
});
//00796B
const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar backgroundColor='#00796B' />
    <AppNavigationScreens />
  </View>
);

export default App;

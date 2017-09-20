import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text } from 'react-native';

import { NavigationActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export class CheckoutScreen extends Component {
  static navigationOptions = () => ({
    title: 'Checkout'
  });

  goOrderSuccess() {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'CheckoutSuccess' })
        ]
      })
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <TouchableNativeFeedback onPress={() => { this.goOrderSuccess(); }}>
          <View style={{ flexDirection: 'row', height: 56, backgroundColor: '#009688', justifyContent: 'flex-end', alignItems: 'center' }}>
            <View>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>PLACE ORDER</Text>
            </View>
            <View style={{ padding: 8 }}>
              <Icon name="arrow-forward" size={25} color={'white'} />
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

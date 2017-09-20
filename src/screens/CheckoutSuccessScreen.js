import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

import { NavigationActions } from 'react-navigation';

export class CheckoutSuccessScreen extends Component {
  static navigationOptions = () => ({
    title: 'Order complete'
  });

  goHome() {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      })
    );
  }

  render() {
    return (
      <View>
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 24 }}>Thank you for order</Text>
        </View>
        <View style={{ padding: 8 }}>
          <Text>You will not receive any order because of demo app</Text>
        </View>
        <View style={{ padding: 8, flexDirection: 'row' }}>
          <Button title="ORDER MORE" color={'#009688'} onPress={() => { this.goHome(); }} />
        </View>
      </View>
    );
  }
}

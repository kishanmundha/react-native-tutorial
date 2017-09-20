import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text, FlatList, Button, Image } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../services';

export class CartScreen extends Component {
  static navigationOptions = () => ({
    title: 'Cart'
  });

  constructor(props) {
    super(props);

    this.state = {
      cartItems: []
    };
  }

  componentWillMount() {
    ProductService.cartItems$.subscribe(items => {
      this.setState({
        cartItems: items
      });
    });

    this.cartItemCountSubcriber = ProductService.cartItemCount$.subscribe(count => {
      if (count === 0) {
        this.props.navigation.goBack();
      }
    });
  }

  componentWillUnmount() {
    this.cartItemCountSubcriber.unsubscribe();
  }

  /**
   * @type {Subscription}
   */
  cartItemCountSubcriber;
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.cartItems}
            keyExtractor={(info, index) => index}
            renderItem={itemInfo => (
              <View style={{ height: 72, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingLeft: 16 }}>
                  <Text style={{ color: 'black', opacity: 0.87, fontSize: 16 }}>{itemInfo.item.name}</Text>
                  <Text style={{ color: 'black', opacity: 0.70, fontSize: 14 }}>Qty: {itemInfo.item.qty}</Text>
                </View>
                <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                  <TouchableNativeFeedback onPress={() => { ProductService.removeProductFromCart(itemInfo.item.id); }}>
                    <View style={{ padding: 16, justifyContent: 'center', opacity: 0.54 }} >
                      <Icon name="delete" size={25} color={'black'} />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: 'black', opacity: 0.12 }} />
            )}
          />
        </View>
        <TouchableNativeFeedback onPress={() => { this.props.navigation.navigate('Checkout'); }}>
          <View style={{ flexDirection: 'row', height: 56, backgroundColor: '#009688', justifyContent: 'flex-end', alignItems: 'center' }}>
            <View>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>CHECKOUT</Text>
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

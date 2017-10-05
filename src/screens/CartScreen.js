import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text, FlatList, Button, Image } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../services';

import { QuantityButton } from '../components';

export class CartScreen extends Component {
  static navigationOptions = () => ({
    title: 'Cart'
  });

  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      cart: null
    };
  }

  componentWillMount() {
    // ProductService.cartItems$.subscribe(items => {
    //   this.setState({
    //     cartItems: items
    //   });
    // });

    this.cartItemCountSubcriber = ProductService.cart$.subscribe(cart => {
      this.setState({
        cart
      });

      if (cart.count === 0) {
        this.props.navigation.goBack();
      }
    });
    // this.cartItemCountSubcriber = ProductService.cartItemCount$.subscribe(count => {
    //   if (count === 0) {
    //     this.props.navigation.goBack();
    //   }
    // });
  }

  componentWillUnmount() {
    this.cartItemCountSubcriber.unsubscribe();
  }

  /**
   * @type {Subscription}
   */
  cartItemCountSubcriber;
  
  updateQty(product, qty) {
    ProductService.updateCart(product, qty);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.cart.items}
            keyExtractor={(info, index) => index}
            renderItem={itemInfo => (
              <View style={{ height: 48, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingLeft: 16 }}>
                  <Text style={{ color: 'black', opacity: 0.87, fontSize: 16 }}>{itemInfo.item.name}</Text>
                  {/* <Text style={{ color: 'black', opacity: 0.70, fontSize: 14 }}>Qty: {itemInfo.item.qty}</Text> */}
                </View>
                <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                  <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={{ fontSize: 14, color: 'black', opacity: 0.70 }}>$ {itemInfo.item.price} x </Text>
                    <QuantityButton value={itemInfo.item.qty} onChangeValue={qty => this.updateQty(itemInfo.item, qty)} />
                    <View style={{ width: 60, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, color: 'black', opacity: 0.87 }}>$ {itemInfo.item.totalPrice}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: 'black', opacity: 0.12 }} />
            )}
            ListFooterComponent={() => (
              <View>
                <View style={{ height: 1, backgroundColor: 'black', opacity: 0.12 }} />
                <View style={{ height: 48, alignItems: 'center', flexDirection: 'row' }}>
                  <View style={{ flex: 1, paddingLeft: 16 }}>
                    <Text style={{ color: 'black', opacity: 0.87, fontSize: 16, fontWeight: 'bold' }}>Total</Text>
                  </View>
                  <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }} >
                      <View style={{ width: 60, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: 'black', opacity: 0.87, fontWeight: 'bold' }}>$ {this.state.cart.price}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
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

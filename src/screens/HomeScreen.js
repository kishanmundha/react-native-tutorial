import React, { Component } from 'react';
import {
  Button,
  FlatList,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  ActivityIndicator,
  Animated,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../services';

import { QuantityButton } from '../components';

export class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'React Native Tutorial',
    headerLeft: (
      <View style={{ padding: 16, justifyContent: 'center' }}>
        <Icon name="menu" size={25} color={'white'} />
      </View>
    ),
    headerRight: (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('Cart');
          console.log(navigation);
        }}
      >
        <View
          style={{ padding: 16, justifyContent: 'center' }}
        >
          <Icon name="shopping-basket" size={25} color={'white'} />
        </View>
      </TouchableNativeFeedback>
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      isLoading: true,
      cartItemCount: 0,
      viewCartBottom: new Animated.Value(-56),
      value: 1
    };
  }

  componentWillMount() {
    ProductService.getProducts()
      .then(products => {
        const data = products.map(product => {
          const item = product;
          item.qty = 0;
          return item;
        });

        this.setState({
          products: data,
          isLoading: false,
        });
      });

    this.cartItemCountSubcriber = ProductService.cartItemCount$.subscribe(count => {
      this.setState({
        cartItemCount: count
      });

      const toValue = count === 0 ? -56 : 0;
      if (count !== 0) {
        Animated.timing(this.state.viewCartBottom,
          {
            toValue,
            duration: 200,
          }
        ).start();
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
  
  addToCart(id, name) {
    ProductService.addProductToCart(id, name);
  }

  updateQty(product, value) {
    const products = this.state.products;
    product.qty += value;

    if (value === 1) {
      ProductService.addProductToCart(product.id, product.name);
    } else {
      ProductService.removeProductFromCart(product.id);
    }

    this.setState({
      products: [...products]
    });
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={50} />
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.products}
          keyExtractor={(info, index) => index}
          renderItem={itemInfo => (
            <View style={{ height: 72, alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ paddingLeft: 16, width: 72 }}>
                <Image source={{ uri: itemInfo.item.image }} resizeMode="cover" style={{ width: 40, height: 40 }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'black', opacity: 0.87, fontSize: 16 }}>{itemInfo.item.name}</Text>
                <Text style={{ color: 'black', opacity: 0.70, fontSize: 14 }}>$ {itemInfo.item.price}</Text>
              </View>
              <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                {/* <Button title="Add to cart" onPress={() => { this.addToCart(itemInfo.item.id, itemInfo.item.name); }} color={'#009688'} /> */}
                <QuantityButton value={itemInfo.item.qty} onChangeValue={value => this.updateQty(itemInfo.item, value)} />
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: 'black', opacity: 0.12 }} />
          )}
          ListFooterComponent={() => (
            <View style={{ height: 56 }} />
          )}
        />
        {(this.state.cartItemCount !== 0 || true) && <TouchableNativeFeedback onPress={() => { this.props.navigation.navigate('Cart'); }}>
          <Animated.View style={{ flexDirection: 'row', position: 'absolute', left: 0, right: 0, bottom: this.state.viewCartBottom, height: 56, backgroundColor: '#009688', justifyContent: 'flex-end', alignItems: 'center' }}>
            <View>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>View Cart</Text>
            </View>
            <View style={{ padding: 8 }}>
              <Icon name="arrow-forward" size={25} color={'white'} />
            </View>
          </Animated.View>
        </TouchableNativeFeedback>}
      </View>
    );
  }
}

import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

class ProductService {
  cartItems = [];
  cartItemCount = 0;
  cart = {
    items: [],
    count: 0,
    price: 0,
  };

  cartItemCount$ = new BehaviorSubject(0);
  cartItems$ = new BehaviorSubject([]);
  cart$ = new BehaviorSubject({
    items: [],
    count: 0,
    price: 0,
  });

  /**
   * @return {Promise<any[]>}
   */
  getProducts() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/react-native-tutorial/products').once('value', data => {
        resolve(data.val());
      }, error => {
        console.log('Error:', error);
        reject(error);
      });
    });
  }

  /**
   * Add product to cart
   * @param {number} productId 
   * @param {string} productName 
   */
  addProductToCart(productId, productName) {
    let cartItem = this.cartItems.find(item => item.id === productId);

    if (!cartItem) {
      cartItem = { id: productId, name: productName, qty: 1 };
      this.cartItems.push(cartItem);
    } else {
      cartItem.qty++;
    }

    this.cartItemCount++;
    this.cartItemCount$.next(this.cartItemCount);
    this.cartItems$.next(this.cartItems);
  }

  /**
   * Remove product from cart
   * @param {number} productId 
   */
  removeProductFromCart(productId) {
    const cartItem = this.cartItems.find(item => item.id === productId);

    if (cartItem) {
      if (cartItem.qty > 0) {
        this.cartItemCount -= cartItem.qty;
      }

      const itemIndex = this.cartItems.findIndex(item => item.id === productId);

      this.cartItems.splice(itemIndex, 1);
    }

    this.cartItemCount$.next(this.cartItemCount);
    this.cartItems$.next(this.cartItems);
  }

  clearCart() {
    this.cartItems.length = 0;
    this.cartItemCount = 0;

    this.cartItemCount$.next(this.cartItemCount);
    this.cartItems$.next(this.cartItems);
  }

  updateCart(product, qty) {
    let cartItem = this.cart.items.find(item => item.id === product.id);
    if (!cartItem) {
      cartItem = { id: product.id, name: product.name, qty, price: product.price, totalPrice: product.price * qty };
      this.cart.items.push(cartItem);
    } else {
      cartItem.qty = qty;
      cartItem.totalPrice = product.price * qty;
    }

    if (!cartItem.qty) {
      const index = this.cart.items.findIndex(item => item.id === product.id);

      this.cart.items.splice(index, 1);
    }

    this.cart.count = 0;
    this.cart.price = 0;
    this.cart.items.forEach(item => {
      this.cart.count += item.qty;
      this.cart.price += item.totalPrice;
    });

    this.cart$.next(this.cart);
  }
}

export default new ProductService();

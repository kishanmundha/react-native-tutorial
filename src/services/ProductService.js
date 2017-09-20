import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

class ProductService {
  cartItems = [];
  cartItemCount = 0;

  cartItemCount$ = new BehaviorSubject(0);
  cartItems$ = new BehaviorSubject([]);

  /**
   * @return {Promise<any[]>}
   */
  getProducts() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/react-native-tutorial/products').once('value', data => {
        resolve(data.val());
      }, error => reject(error));
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
}

export default new ProductService();

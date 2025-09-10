import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })

    if (matchingItem) {
      matchingItem.quantity++
    } else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1',
      });
    }

    this.saveToLocalStorage()
  }

  removeFromCart(productId) {
    // проверяем наличие id
    const exists = this.cartItems.some(cartItem => cartItem.productId === productId);
    if (!exists) return;

    // убираем из корзины товар по id
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);

    this.saveToLocalStorage()
  }

  calculateCartQuantity() {
    const cartQuantity = this.cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

    if (!matchingItem) return;

    matchingItem.quantity = newQuantity
    this.saveToLocalStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

    if (!matchingItem || !validDeliveryOption(deliveryOptionId)) return

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToLocalStorage();
  }

}

/*function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
    },

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      })

      if (matchingItem) {
        matchingItem.quantity++
      } else {
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId: '1',
        });
      }

      this.saveToLocalStorage()
    },

    removeFromCart(productId) {
      // проверяем наличие id
      const exists = this.cartItems.some(cartItem => cartItem.productId === productId);
      if (!exists) return;

      // убираем из корзины товар по id
      this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);

      this.saveToLocalStorage()
    },

    calculateCartQuantity() {
      const cartQuantity = this.cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
      return cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
      const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

      if (!matchingItem) return;

      matchingItem.quantity = newQuantity
      this.saveToLocalStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

      if (!matchingItem || !validDeliveryOption(deliveryOptionId)) return

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToLocalStorage();
    },
  };

  return cart;
}

Создание обьекта с помощью функции
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
*/


// Создание обьекта с помощью класса
export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


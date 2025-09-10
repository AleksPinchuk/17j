// import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from '../../data/cart.js'
import { cart } from '../../data/cart-oop.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')
  });

  it('adds a new product to the cart', () => {
    cart.cartItems = [];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1',
    }]))
  })

  it('adds an existing product to the cart', () => {
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1',
    }];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1',
    }]))
  })
})

describe('test suite: remove from the cart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')

    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1',
    }];
  });

  it('remove a product that is in the cart', () => {
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems.length).toEqual(0)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })

  it('remove a product that\'s not in the cart (does nothing)', () => {
    cart.removeFromCart('e43638ce')
    expect(cart.cartItems.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })


})

describe('test suite: updates delivery option', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')

    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1',
    }];
  });

  it('updates delivery option of product', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3')
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })

  it('updates delivery option of product that\'s not at cart(does nothing)', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85', '3')
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItems.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })

  it('does nothing if the delivery option does not exist', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
})


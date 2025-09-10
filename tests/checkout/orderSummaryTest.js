import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
// import { loadFromStorage, cart } from "../../data/cart.js";
import { cart } from "../../data/cart-class.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productName1 = 'Black and Gray Athletic Cotton Socks - 6 Pairs';
  const productName2 = 'Intermediate Size Basketball';
  const productPrice1 = '$10.90'
  const productPrice2 = '$20.95'

  beforeEach(() => {
    spyOn(localStorage, 'setItem')

    spyOn(localStorage, 'getItem').and.callFake(
      () => {
        return JSON.stringify([{
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1',
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2',
        }]);
      });
    cart.loadFromStorage();

    document.querySelector('.js-test-container').innerHTML = `
    <div class="order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="checkout-header"></div>
    `;

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  })

  it('displays the html', () => {
    expect(
      document.querySelectorAll('.cart-item-container').length
    ).toEqual(2)

    expect(document.querySelector(`.product-quantity-${productId1}`).innerText).toContain('Quantity: 2')

    expect(document.querySelector(`.product-quantity-${productId2}`).innerText).toContain('Quantity: 1')

    expect(
      document.querySelector(`.product-name-${productId1}`).innerText
    ).toEqual(productName1);

    expect(
      document.querySelector(`.product-name-${productId2}`).innerText
    ).toEqual(productName2);

    expect(
      document.querySelector(`.product-price-${productId1}`).innerText
    ).toEqual(productPrice1);

    expect(
      document.querySelector(`.product-price-${productId2}`).innerText
    ).toEqual(productPrice2);
  });

  it('removes a product', () => {
    document.querySelector(`.delete-quantity-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.cart-item-container-${productId1}`)).toEqual(null);

    expect(
      document.querySelector(`.cart-item-container-${productId2}`)).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(1);

    expect(cart.cartItems[0].productId).toEqual(productId2);

    expect(
      document.querySelector(`.product-name-${productId2}`).innerText
    ).toEqual(productName2);

    expect(
      document.querySelector(`.product-price-${productId2}`).innerText
    ).toEqual(productPrice2);
  })

  it('updates the delivery option', () => {
    document.querySelector(`.delivery-option-${productId1}-3`).click()

    const input = document.querySelector(`.delivery-option-input-${productId1}-3`)

    expect(input.checked).toEqual(true)
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1)
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3')

    const shippingPrice = document.querySelector('.shipping-price')
    const orderTotal = document.querySelector('.order-total')

    expect(shippingPrice.textContent).toEqual('$14.98')
    expect(orderTotal.textContent).toEqual('$63.50')
  })
});
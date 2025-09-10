import { validDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

let timeoutIds = {};

// export function addToCart(productId) {
//   let matchingItem;
//   const selectValue = document.querySelector(`.quantity-selector-${productId}`).value
//   const addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`)

//   addedToCartElement.classList.add('added')

//   if (timeoutIds[productId]) {
//     clearTimeout(timeoutIds[productId])
//   }

//   timeoutIds[productId] = setTimeout(() => {
//     addedToCartElement.classList.remove('added');
//     delete timeoutIds[productId];
//   }, 2000)

//   cart.forEach((cartItem) => {
//     if (productId === cartItem.productId) {
//       matchingItem = cartItem;
//     }
//   })

//   if (matchingItem) {
//     matchingItem.quantity += Number(selectValue)
//   } else {
//     cart.push({
//       productId,
//       quantity: Number(selectValue),
//       deliveryOptionId: '1',
//     });
//   }

//   saveToLocalStorage()
// }

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })

  if (matchingItem) {
    matchingItem.quantity++
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: '1',
    });
  }

  saveToLocalStorage()
}

export function removeFromCart(productId) {
  // проверяем наличие id
  const exists = cart.some(cartItem => cartItem.productId === productId);
  if (!exists) return;

  // убираем из корзины товар по id
  cart = cart.filter(cartItem => cartItem.productId !== productId);

  saveToLocalStorage()
}

export function calculateCartQuantity() {
  const cartQuantity = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);

  if (!matchingItem) return;

  matchingItem.quantity = newQuantity 
  saveToLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);

  if (!matchingItem || !validDeliveryOption(deliveryOptionId)) return

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
}
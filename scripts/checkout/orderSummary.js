// import { cart, calculateCartQuantity, updateQuantity, updateDeliveryOption, removeFromCart } from "../../data/cart.js";
import { cart } from "../../data/cart-class.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js"; 

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption)

    cartSummaryHTML += `
  <div class="cart-item-container-${matchingProduct.id} cart-item-container">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name product-name-${matchingProduct.id}">
                  ${matchingProduct.name}
                </div>
                <div class="product-price product-price-${matchingProduct.id}">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label quantity-label-${matchingProduct.id
      }">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id
      }">
                    Update
                  </span>
                  <input class="quantity-input-${matchingProduct.id
      } quantity-input">
                  <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id
      }">Save</span>
                  <span class="delete-quantity-link delete-quantity-link-${matchingProduct.id} link-primary" data-product-id="${matchingProduct.id
      }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `;
  });

  document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption)

      const priceString = deliveryOption.priceCents === 0
        ? 'Free'
        : `$${formatCurrency(deliveryOption.priceCents)}`

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
    <div class="delivery-option delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
          name="delivery-option-${matchingProduct.id}">
        <div>
           <div class="delivery-option-date">
               ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shipping
            </div>
        </div>
    </div>
    `;
    });

    return html;
  }

  document.querySelectorAll('.delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })

  document.querySelectorAll(".delete-quantity-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.dataset.productId;
      cart.removeFromCart(productId);

      // document.querySelector(`.cart-item-container-${productId}`).remove();

      // updateCartQuantity();
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });

  document.querySelectorAll(".update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((saveLink) => {
    const productId = saveLink.dataset.productId;
    const quantityInput = document.querySelector(`.quantity-input-${productId}`);

    saveLink.addEventListener("click", () => {
      handleSaveQuanity(productId, quantityInput);
    });

    quantityInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleSaveQuanity(productId, quantityInput);
      }
    });
  });

  function handleSaveQuanity(productId, quantityInput) {
    const newQuantity = Number(quantityInput.value);
    if (newQuantity <= 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 1 and less than 1000 ");
      return; // early return
    }

    cart.updateQuantity(productId, newQuantity);

    const container = document.querySelector(`.cart-item-container-${productId}`);
    container.classList.remove("is-editing-quantity");

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  }
}


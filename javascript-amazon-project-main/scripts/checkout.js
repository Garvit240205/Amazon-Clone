import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import * as utils from './utils/money.js';

let cartHTML='';

for(let i=0;i<cart.length;i++){

  let product;
  products.forEach((item)=>{
    if(item.id===cart[i].productId){
      product=item;
      return;//no need actually the loop will still go on.
    }
  });

  cartHTML+=`
  <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${product.image}">

        <div class="cart-item-details">
          <div class="product-name">
          ${product.name}
          </div>
          <div class="product-price">
          ${'$'+utils.formatCurrency(product.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cart[i].productQuantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${product.id}"> <!--so that we can select one radio selector for each product in cart-->
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

document.querySelector('.js-order-summary').innerHTML=cartHTML;

function emptyCart(){
  document.querySelector('.js-empty-cart-button')
  .addEventListener('click',function(){
    localStorage.removeItem('cart');
    let cartHTML='';
    document.querySelector('.js-order-summary').innerHTML=cartHTML;
  });
}

emptyCart();//to empty cart
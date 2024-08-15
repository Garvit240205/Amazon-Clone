import {cart,saveToStorage} from '../../data/cart.js';
import {products} from '../../data/products.js';
import * as utils from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //because dayjs is the dault export of DayJS library
import {delivery} from '../delivery.js';
import renderPaymentSummary from './paymentSummary.js';

let cartHTML='';


for(let i=0;i<cart.length;i++){

  let product;
  products.forEach((item)=>{
    if(item.id===cart[i].productId){
      product=item;
      return;//no need actually the loop will still go on.
    }
  });

  const today=dayjs();
  let toAdd;
  if(cart[i].deliveryId==1) toAdd=7;
  else if(cart[i].deliveryId==2) toAdd=3;
  else toAdd=0;
  const after=today.add(toAdd,'days');
  const dateafter= after.format('dddd, MMMM D');

  cartHTML+=`
  <div class="cart-item-container js-cart-item-container-${product.id}">
      <div class="delivery-date js-delivery-date-${product.id}">
        Delivery date: ${dateafter}
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
            <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id=${product.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsGeneration(product,cart[i])}
        </div>
      </div>
    </div>
  `;
};

function deliveryOptionsGeneration(product,cartItem){
  let radioHTML='';
  const today=dayjs();
  const after3=today.add(3,'days');
  const after7=today.add(7,'days');
  const datetoday=today.format('dddd, MMMM D');
  const dateafter3=after3.format('dddd, MMMM D');
  const dateafter7= after7.format('dddd, MMMM D');
  let deliveryId=cartItem.deliveryId;
  radioHTML+=`
    <div class="delivery-option">
      <input type="radio" 
        ${deliveryId === 1 ? 'checked':''}
        class="delivery-option-input js-delivery-option-input-${product.id}" data-radio-id=7
        name="delivery-option-${product.id}"> <!--so that we can select one radio selector for each product in cart-->
      <div>
        <div class="delivery-option-date">
          ${dateafter7}
        </div>
        <div class="delivery-option-price">
          FREE Shipping
        </div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio" 
        ${deliveryId === 2 ? 'checked':''}
        class="delivery-option-input js-delivery-option-input-${product.id}" data-radio-id=3
        name="delivery-option-${product.id}">
      <div>
        <div class="delivery-option-date">
          ${dateafter3}
        </div>
        <div class="delivery-option-price">
          $${utils.formatCurrency(delivery[1].priceCents)} - Shipping
        </div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio" 
        ${deliveryId === 3 ? 'checked':''}
        class="delivery-option-input js-delivery-option-input-${product.id}" data-radio-id=0
        name="delivery-option-${product.id}">
      <div>
        <div class="delivery-option-date">
          ${datetoday}
        </div>
        <div class="delivery-option-price">
          $${utils.formatCurrency(delivery[2].priceCents)} - Shipping
        </div>
      </div>
    </div>
  `;
  return radioHTML;
};

if(cartHTML.length===0){
  cartHTML+='<p class="cart-is-empty-para">Your cart is empty.</p> <a href="amazon.html"><button class="view-products-button">View Products</button></a>';
}
document.querySelector('.js-order-summary').innerHTML=cartHTML;
renderPaymentSummary();
renderCheckoutItemsNumber(cart)

function setDeliveryDate(){
  cart.forEach((item)=>{
    document.querySelectorAll(`.js-delivery-option-input-${item.productId}`).forEach((radioitem)=>{
      radioitem.addEventListener('click',function(){
        let dateHTML='Delivery date: ';
        let after=parseInt(this.dataset.radioId);//because we want to point to radioitem not the event object so we cant take input param.
        const today=dayjs();
        const finalDate=today.add(after,'days');
        const dateFinalFormatted=finalDate.format('dddd, MMMM D');
  
        dateHTML+=`${dateFinalFormatted}`
        if(after===7){
          item.deliveryId=1;
        }
        else if(after===3){
          item.deliveryId=2;
        }
        else{
          item.deliveryId=3;
        }
        
        document.querySelector(`.js-delivery-date-${item.productId}`).innerHTML=dateHTML;
        renderPaymentSummary();
        renderCheckoutItemsNumber(cart)
        saveToStorage();
      });
    })
  });
}

setDeliveryDate();



function emptyCart(){
  document.querySelector('.js-empty-cart-button')
  .addEventListener('click',function(){
    localStorage.removeItem('cart');
    cartHTML='<p class="cart-is-empty-para">Your cart is empty.</p> <a href="amazon.html"><button class="view-products-button">View Products</button></a>';
    document.querySelector('.js-order-summary').innerHTML=cartHTML;
    cart.length = 0;
    renderPaymentSummary();
    renderCheckoutItemsNumber(cart)
  });
};

emptyCart();//to empty cart

function deleteFromCart(productId){
  let cartIndex;
  cart.forEach((item,index)=>{
    if(item.productId===productId){
      cart.splice(index,1);
      saveToStorage();
      cartIndex=index;
    }
  });
  
  document.querySelector(`.js-cart-item-container-${productId}`).remove();//to remove that element from HTML
  if(cart.length===0){
    cartHTML='<p class="cart-is-empty-para">Your cart is empty.</p> <a href="amazon.html"><button class="view-products-button">View Products</button></a>';
    document.querySelector('.js-order-summary').innerHTML=cartHTML;
  }
  renderPaymentSummary();
  renderCheckoutItemsNumber(cart)
};

document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
  link.addEventListener('click',function(){
    deleteFromCart(link.dataset.productId);
    renderPaymentSummary();
    renderCheckoutItemsNumber(cart)
  });
});

function renderCheckoutItemsNumber(cart){
  document.querySelector('.js-return-to-home-link').innerHTML=`${cart.length} items`
};
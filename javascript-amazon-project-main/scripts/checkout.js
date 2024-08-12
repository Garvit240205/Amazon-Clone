import {cart,saveToStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import * as utils from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //because dayjs is the dault export of DayJS library
import {delivery} from './delivery.js';

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
  const after3=today.add(3,'days');
  const after7=today.add(7,'days');
  const datetoday=today.format('dddd, MMMM D');
  const dateafter3=after3.format('dddd, MMMM D');
  const dateafter7= after7.format('dddd, MMMM D');
  cartHTML+=`
  <div class="cart-item-container js-cart-item-container-${product.id}">
      <div class="delivery-date js-delivery-date-${product.id}">
        Delivery date: ${dateafter7}
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
          <div class="delivery-option">
            <input type="radio" checked
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
        </div>
      </div>
    </div>
  `;
};
document.querySelector('.js-order-summary').innerHTML=cartHTML;


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
        console.log(dateHTML);
        document.querySelector(`.js-delivery-date-${item.productId}`).innerHTML=dateHTML;
      });
    })
  });
}

setDeliveryDate();



function emptyCart(){
  document.querySelector('.js-empty-cart-button')
  .addEventListener('click',function(){
    localStorage.removeItem('cart');
    cartHTML='';
    document.querySelector('.js-order-summary').innerHTML=cartHTML;
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
};

document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
  link.addEventListener('click',function(){
    deleteFromCart(link.dataset.productId);
  });
});
import { orders } from "../data/orders.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart, saveToStorage,addToCart } from "../data/cart.js";
// import { displayProduct } from "./tracking.js";

updateCartQuant();
let ordersHTML='';
let productsHTML='';
let dateFinal=dayjs();
let cntr=0;
// console.log(orders);
for(let i=0;i<orders.length;i++){
  ordersHTML+=`
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dayjs(orders[i].orderPlaced).format('dddd, MMMM D')}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(orders[i].total)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orders[i].orderId}</div>
        </div>
      </div>

      <div class="order-details-grid">
        

      
      ${renderProductsForOrders(orders[i],cntr)}
      </div>
    </div>
  `;
  cntr++;
  // console.log(cntr);
}


function renderProductsForOrders(order,cntr){
  productsHTML='';
  // console.log(order);
  for(let i=0;i<order.cart.length;i++){
    let productId=order.cart[i].productId;
    let matchingProduct={};
    for(let j=0;j<products.length;j++){
      if(productId===products[j].id){
        matchingProduct=products[j];
        break;
      }
    }

    const today= dayjs(order.orderPlaced);
    // console.log(today);
    let toAdd;
    if(order.cart[i].deliveryId===1) toAdd=7;
    else if(order.cart[i].deliveryId===2) toAdd=3;
    else toAdd=0;
    const after=today.add(toAdd,'days');
    const dateafter= after.format('dddd, MMMM D');
    dateFinal=after;
    // console.log(dateFinal);
    // console.log(matchingProduct);
    
    productsHTML+=`
    <div class="product-image-container">
      <img src="${matchingProduct.image}">
    </div>
    <div class="product-details js-product-details" data-product-matching='${JSON.stringify(matchingProduct)}' data-cart-matching='${JSON.stringify(order.cart[i])}' data-order-id='${order.orderId}'>
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dateafter}
      </div>
      <div class="product-quantity">
        Quantity: ${order.cart[i].productQuantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again-button-${order.orderId}" data-matching-product='${JSON.stringify(matchingProduct)}'>
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions js-product-actions">
      <a href="tracking.html">
        <button class="track-package-button button-secondary js-track-package-button" data-date-final='${dateFinal}' data-product-matching='${JSON.stringify(matchingProduct)}' data-cart-matching='${JSON.stringify(order.cart[i])}'>
          Track package
        </button>
      </a>
    </div>
    `;
  };

 
  return productsHTML;
};

document.querySelector('.js-orders-grid').innerHTML=ordersHTML;

function updateCartQuant(){
  let cartQuantity=0;

  cart.forEach((item)=>{
    cartQuantity+=item.productQuantity;
  })

  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
}

cntr=0;
// console.log(ordersHTML);
let currUserMail=JSON.parse(localStorage.getItem('curruser'));
document.querySelectorAll('.order-details-grid').forEach((items)=>{

  let orderId=items.querySelector('.js-product-details').dataset.orderId;
  items.querySelectorAll(`.js-buy-again-button-${orderId}`).forEach((singleButton)=>{
    singleButton.addEventListener('click',()=>{
      console.log(singleButton.dataset.matchingProduct);
      let matchingProduct=JSON.parse(singleButton.dataset.matchingProduct);
      addToCart(matchingProduct.id,1);
      updateCartQuant();
    });
  });

  items.querySelectorAll('.js-track-package-button').forEach((button)=>{
    button.addEventListener('click',()=>{
      let dateFinal=dayjs(button.dataset.dateFinal);
      let matchingProduct=JSON.parse(button.dataset.productMatching);
      let cartMatching=JSON.parse(button.dataset.cartMatching);
      // console.log(cartMatching);
      localStorage.setItem(`${currUserMail}-matchingProduct`,JSON.stringify(matchingProduct));
      localStorage.setItem(`${currUserMail}-cartMatching`,JSON.stringify(cartMatching));
      localStorage.setItem(`${currUserMail}-dateFinal`,JSON.stringify(dateFinal));
    });
  });
});

// items.querySelector('.js-product-details').addEventListener('click',()=>{
//   matchingProduct=JSON.parse(items.querySelector('.js-product-details').dataset.productMatching);
//   cartMatching=JSON.parse(items.querySelector('.js-product-details').dataset.cartMatching);
//   addToCart(matchingProduct.id,cartMatching.productQuantity);
//   updateCartQuant();
// });
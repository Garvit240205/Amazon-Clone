import {cart,addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import * as utils from './utils/money.js';

let productsHTML='';

updateCartQuant();//to initially update the cart quantity at home page

for(let i=0;i<products.length;i++){
  productsHTML+=`
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${products[i].image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
      ${products[i].name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${products[i].rating.stars*10}.png">
        <div class="product-rating-count link-primary">
        ${products[i].rating.count}
        </div>
      </div>

      <div class="product-price">
      ${`$${utils.formatCurrency(products[i].priceCents)}`}   <!--to show till 2 decimals-->
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${products[i].id}"
      data-product-quantity=${1}>
        Add to Cart
      </button>
    </div>
  `;
};
document.querySelector('.js-products-grid').innerHTML=productsHTML;



function updateCartQuant(){
  let cartQuantity=0;

  cart.forEach((item)=>{
    cartQuantity+=item.productQuantity;
  })

  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
}


document.querySelectorAll('.js-add-to-cart').forEach(function(button){
  button.addEventListener('click',function(){
    const productId=button.dataset.productId;//unique identifier for every product automatically generated formeach object
    const productQuantity=parseInt(button.dataset.productQuantity);

    addToCart(productId,productQuantity);

    updateCartQuant();

    // console.log(cart);
  });
});


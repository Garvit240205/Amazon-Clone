import {cart,addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import * as utils from './utils/money.js';

let productsHTML='';

updateCartQuant();//to initially update the cart quantity at home page

for(let i=0;i<products.length;i++){
  productsHTML+=`
    <div class="product-container js-product-container">
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
        <select class="js-select">
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


document.querySelectorAll('.js-product-container').forEach((item) => {
  item.querySelector('.js-add-to-cart').addEventListener('click', () => {
    // Get the selected quantity
    let selectedOption = item.querySelector('.js-select').value;
    
    // Get product ID and quantity
    
    const productId = item.querySelector('.js-add-to-cart').dataset.productId;
    const productQuantity = parseInt(selectedOption);

    // Add to cart and update quantity
    addToCart(productId, productQuantity);
    updateCartQuant();
  });
});

function renderSearchInput(){
  let input=document.querySelector('.js-search-bar').value.toLowerCase();
  let matchingProducts=[];

  for(let j=0;j<products.length;j++){//finding matching product from cart
    let x=0;
    let y=0;
    let str=products[j].name.toLowerCase();
    while(y<str.length && x<input.length){
      if(str[y]===input[x]){
        x++;
        y++;
      }
      else{
        x=0;
        if(str[y]===input[x]){
          x++;
        }
        y++;
      }
    }
    if(x>=input.length){
      matchingProducts.push(products[j]);
    }
  }
  let productsHTML='';

  for(let i=0;i<matchingProducts.length;i++){//updating products HTML on home page
    productsHTML+=`
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${matchingProducts[i].image}">
        </div>
  
        <div class="product-name limit-text-to-2-lines">
        ${matchingProducts[i].name}
        </div>
  
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${matchingProducts[i].rating.stars*10}.png">
          <div class="product-rating-count link-primary">
          ${matchingProducts[i].rating.count}
          </div>
        </div>
  
        <div class="product-price">
        ${`$${utils.formatCurrency(matchingProducts[i].priceCents)}`}   <!--to show till 2 decimals-->
        </div>
  
        <div class="product-quantity-container">
          <select class="js-select">
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
  
        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${matchingProducts[i].id}"
        data-product-quantity=${1}>
          Add to Cart
        </button>
      </div>
    `;
  };
  if(productsHTML.length===0){
    productsHTML+='No items match your search.'
  }
  document.querySelector('.js-products-grid').innerHTML=productsHTML;  
};
document.querySelector('.js-search-button').addEventListener('click',()=>{ //search if search button is clicked
  renderSearchInput();
});
document.querySelector('.js-search-bar').addEventListener('keydown',(event)=>{ //search if enter is pressed
  if(event.key==='Enter'){
    renderSearchInput();
  }
});
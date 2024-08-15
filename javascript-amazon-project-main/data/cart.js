export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId,productQuantity){
  let flag=1;
  for(let i=0;i<cart.length;i++){
    if(cart[i].productId==productId){
      cart[i].productQuantity++;
      flag=0;
      break;
    }
  }
  if(flag===1) cart.push({productId,productQuantity,deliveryId: 1});

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
} 

// export let cart={ //creating a cart object instead
//   cartItems: JSON.parse(localStorage.getItem('cart')) || [],

//   addToCart(productId,productQuantity){
//     let flag=1;
//     for(let i=0;i<cart.cartItems.length;i++){
//       if(cart.cartItems[i].productId==productId){
//         cart.cartItems[i].productQuantity++;
//         flag=0;
//         break;
//       }
//     }
//     if(flag===1) cart.cartItems.push({productId,productQuantity,deliveryId: 1});

//     localStorage.setItem('cart', JSON.stringify(cart.cartItems));
//   },

//   saveToStorage(){
//     localStorage.setItem('cart',JSON.stringify(cart.cartItems));
//   } 
// };
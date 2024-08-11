export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId,productQuantity){
  let flag=1;
  for(let i=0;i<cart.length;i++){
    if(cart[i].productId==productId){
      cart[i].productQuantity++;
      flag=0;
      break;
    }
  }
  if(flag===1) cart.push({productId,productQuantity});

  localStorage.setItem('cart', JSON.stringify(cart));
}
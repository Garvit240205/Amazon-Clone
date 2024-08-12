import {cart} from '../../data/cart.js'
import { products } from '../../data/products.js';
import { delivery } from '../delivery.js';
import { formatCurrency } from '../utils/money.js';

export default function renderPaymentSummary(){
  let product;
  let totalPrice=0;
  let shippingCost=0;
  let totalBeforeTax=0;
  let totalAfterTax=0;
  let itemcount=0;
  cart.forEach((cartitem)=>{
    products.forEach((item)=>{
      if(item.id===cartitem.productId){
        product=item;
      }
    });
    shippingCost+=delivery[cartitem.deliveryId-1].priceCents;
    totalPrice+=cartitem.productQuantity*product.priceCents;
    itemcount+=cartitem.productQuantity;
  });

  totalBeforeTax+=shippingCost+totalPrice;
  totalAfterTax=totalBeforeTax*(0.1);
  const total=totalAfterTax+totalBeforeTax;

  const paymentSummaryHTML=`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${itemcount}):</div>
      <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(totalAfterTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(total)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
};
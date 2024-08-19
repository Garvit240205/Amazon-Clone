import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let currUserMail=JSON.parse(localStorage.getItem('curruser'));
export let orders=JSON.parse(localStorage.getItem(`${currUserMail}-orders`))||[];



function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
};

export function addToOrders(cart,total){
  orders.push({
    orderId: generateUUID(),
    orderPlaced: dayjs(),
    total,
    cart
  })
  localStorage.setItem(`${currUserMail}-orders`,JSON.stringify(orders));
};


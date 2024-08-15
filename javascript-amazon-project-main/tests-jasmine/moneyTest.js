import {formatCurrency} from '../scripts/utils/money.js';

describe('test suite: Money Tests',()=>{
  it('converts cents into dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('converts 0 into 0.00',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });
  
});
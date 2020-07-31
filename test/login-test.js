import { expect } from 'chai';
import loginHandler from '../src/loginHandler.js';

describe('loginHandler', () => {
  let customerUsername, managerUsername, wrongUsername;

  beforeEach(() => {
    customerUsername = 'customer20';
    shortCustomerUsername = 'customer9';
    managerUsername = 'manager';
    wrongUsername = 'cstomer20';
  })

  it('should be able to return the user\'s id as a number'), () => {
    expect(loginHandler.getUserId(customerUsername)).to.equal(20);
    expect(loginHandler.getUserId(shortCustomerUsername)).to.equal(9);
  })
})

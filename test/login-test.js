import { expect } from 'chai';
import loginHandler from '../src/loginHandler.js';

describe('loginHandler', () => {
  let customerUsername, shortCustomerUsername, managerUsername, wrongUsername, password, wrongPassword;

  beforeEach(() => {
    customerUsername = 'customer20';
    shortCustomerUsername = 'customer9';
    managerUsername = 'manager';
    wrongUsername = 'cstomer20';
    password = 'overlook2020';
    wrongPassword = 'Overlook2020';
  })

  it('should be able to validate a user ID', () => {
    expect(loginHandler.validateUserId(customerUsername)).to.equal(true);
    expect(loginHandler.validateUserId(shortCustomerUsername)).to.equal(true);
    expect(loginHandler.validateUserId(wrongUsername)).to.equal(false);
  })

  it('should be able to validate a password', () => {
    expect(loginHandler.validatePassword(password)).to.equal(true);
    expect(loginHandler.validatePassword(wrongPassword)).to.equal(false);
  })

  it('should return false if either credential is wrong', () => {
    expect(loginHandler.validateLogin(wrongUsername, password)).to.equal(false);
    expect(loginHandler.validateLogin(customerUsername, wrongPassword)).to.equal(false);
    expect(loginHandler.validateLogin(managerUsername, wrongPassword)).to.equal(false);
  })

  it('should return true if both credentials are correct', () => {
    expect(loginHandler.validateLogin(customerUsername, password)).to.equal(true);
    expect(loginHandler.validateLogin(managerUsername, password)).to.equal(true);
  })
})

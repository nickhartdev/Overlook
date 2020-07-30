import { expect } from 'chai';
import User from '../User.js';

describe('User', () => {
  it('should be a function', () => {
    expect(User).to.be.a('function');
  })
});

import { expect } from 'chai';
import User from '../src/User.js';

describe('User', () => {
  let user, testData;

  beforeEach(() => {
    testData = {id: 1, name: 'Bill'}
    user = new User(testData);
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  })

  it('should have an id', () => {
    expect(user.id).to.equal(1);
  })

  it('should have a name', () => {
    expect(user.name).to.equal('Bill');
  })

});

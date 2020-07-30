import { expect } from 'chai';
import User from '../src/User.js';

describe('User', () => {
  let user, testUserData;

  beforeEach(() => {
    testUserData = {id: 1, name: 'Bill'};
    user = new User(testUserData);
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  })

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  })

  it('should be a child of Data', () => {
    expect(user.validateDataType).to.be.a('function');
  })

  it('should have an id', () => {
    expect(user.id).to.equal(1);
  })

  it('should have a name', () => {
    expect(user.name).to.equal('Bill');
  })
});

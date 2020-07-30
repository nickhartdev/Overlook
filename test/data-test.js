import { expect } from 'chai';
import Data from '../src/Data.js';
import User from '../src/User.js';

describe('Data', () => {
  let userData, badUserData1, data, user, badUser1;

  beforeEach(() => {
    userData = {name: 'Sal', id: 1};
    badUserData1 = {name: {name: 'Sal'}, id: '1'};
    data = new Data();
    user = new User(userData);
    badUser1 = new User(badUserData1);
  })

  it('should be a function', () => {
    expect(Data).to.be.a('function');
  })

  it('should be an instance of Data', () => {
    expect(data).to.be.an.instanceof(Data);
  })

  it('should validate a given data type', () => {
    expect(data.validateDataType(user.name, 'string')).to.equal(user.name);
    expect(data.validateDataType(badUser1.name, 'string')).to.equal(null);
  })
})

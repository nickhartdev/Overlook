import { expect } from 'chai';
import Data from '../src/Data.js';
import User from '../src/User.js';
import Booking from '../src/Booking.js';

describe('Data', () => {
  let userData, badUserData1, bookingsData, data, user, badUser1;

  beforeEach(() => {
    userData = {name: 'Sal', id: 1};
    badUserData1 = {name: {name: 'Sal'}, id: -1};
    bookingsData = [
      new Booking({
        id: 'a23wfsdov09ansoid897y',
        userID: 1,
        date: '2020/08/01',
        roomNumber: 14,
        roomServiceCharges: []
      }),
      new Booking({
        id: 'podmfgdoi123dwdf',
        userID: 2,
        date: '2020/08/01',
        roomNumber: 6,
        roomServiceCharges: []
      }),
      new Booking({
        id: '0n98ph9navdp009un0',
        userID: 1,
        date: '2020/08/02',
        roomNumber: 14,
        roomServiceCharges: []
      })
    ]
    data = new Data();
    user = new User(userData, bookingsData);
    badUser1 = new User(badUserData1, bookingsData);
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

  it('should only accept positive numbers', () => {
    expect(data.validateDataType(badUser1.id)).to.equal(null);
  })
})

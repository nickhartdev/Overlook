import { expect } from 'chai';
import Data from '../src/Data.js';
import User from '../src/User.js';
import Booking from '../src/Booking.js';
import Room from '../src/Room.js';

describe('Data', () => {
  let userData, badUserData1, bookingsData, roomsData, data, user, badUser1;

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
    roomsData = [
      new Room({
        number: 1,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'california king',
        numBeds: 1,
        costPerNight: 500.00
      }),
      new Room({
        number: 2,
        roomType: 'yes',
        bidet: true,
        bedSize: 'twin',
        numBeds: 3,
        costPerNight: 250.00
      }),
      new Room({
        number: 14,
        roomType: 'bungalow',
        bidet: false,
        bedSize: 'hammock',
        numBeds: 0,
        costPerNight: 50.0
      })
    ]
    data = new Data();
    user = new User(userData, bookingsData, roomsData);
    badUser1 = new User(badUserData1, bookingsData, roomsData);
  })

  it('should be a function', () => {
    expect(Data).to.be.a('function');
  })

  it('should be an instance of Data', () => {
    expect(data).to.be.an.instanceof(Data);
  })

  it('should validate a given data type', () => {
    expect(data.validateDataType(user.name, ['string'])).to.equal(user.name);
    expect(data.validateDataType(badUser1.name, ['string'])).to.equal(null);
  })
})

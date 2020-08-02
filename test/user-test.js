import { expect } from 'chai';
import User from '../src/User.js';
import Booking from '../src/Booking.js';
import Room from '../src/Room.js';

describe('User', () => {
  let testUserData, testBookingsData, testRoomsData, user;

  beforeEach(() => {
    testUserData = {id: 1, name: 'Bill'};
    testBookingsData = [
      new Booking({
        id: 'a23wfsdov09ansoid897y',
        userID: 1,
        date: '2020/08/01',
        roomNumber: 1,
        roomServiceCharges: []
      }),
      new Booking({
        id: 'podmfgdoi123dwdf',
        userID: 2,
        date: '2020/08/01',
        roomNumber: 2,
        roomServiceCharges: []
      }),
      new Booking({
        id: '0n98ph9navdp009un0',
        userID: 1,
        date: '2020/08/02',
        roomNumber: 3,
        roomServiceCharges: []
      })
    ],
    testRoomsData = [
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
        number: 3,
        roomType: 'bungalow',
        bidet: false,
        bedSize: 'hammock',
        numBeds: 0,
        costPerNight: 50.0
      })
    ]
    user = new User(testUserData, testBookingsData);
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

  it('should take in all attributes from an instance of user data', () => {
    expect(user.id).to.equal(testUserData.id);
    expect(user.name).to.equal(testUserData.name);
  })

  it('should know about all bookings made for that user', () => {
    expect(user.bookings).to.deep.equal([testBookingsData[0], testBookingsData[2]]);
  })

  it('should have an empty array if there are no matching bookings', () => {
    const newUser = new User({name: 'Lou', id: 72}, []);
    expect(newUser.bookings).to.deep.equal([]);
  })

  it('should know how much the user has spent on bookings in total', () => {
    expect(user.calculateTotalExpenditures(testRoomsData)).to.equal(550.00);
  })
});

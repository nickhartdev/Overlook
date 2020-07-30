import { expect } from 'chai';
import User from '../src/User.js';
import Booking from '../src/Booking.js';

describe('User', () => {
  let testUserData, testBookingsData, user;

  beforeEach(() => {
    testUserData = {id: 1, name: 'Bill'};
    testBookingsData = [
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
});

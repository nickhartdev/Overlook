import { expect } from 'chai';
import Booking from '../src/Booking.js';

describe('Booking', () => {
  let booking, testBookingData;

  beforeEach(() => {
    testBookingData = {
      id: 'aws2nfio84gwr9',
      userID: 1,
      date: '2020/07/30',
      roomNumber: 12,
      roomServiceCharges: []
    }
    booking = new Booking(testBookingData);
  })

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  })

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceof(Booking);
  })

  it('should have an id', () => {
    expect(booking.id).to.equal(testBookingData.id);
  })
})

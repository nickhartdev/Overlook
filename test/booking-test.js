import { expect } from 'chai';
import Booking from '../src/Booking.js';

describe('Booking', () => {
  let booking, testBookingData;

  beforeEach(() => {
    booking = new Booking();
  })

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  })

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceof(Booking);
  })
})

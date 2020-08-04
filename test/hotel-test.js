import { expect } from 'chai';
import Room from '../src/Room.js';
import Booking from '../src/Booking.js';
import Hotel from '../src/Hotel.js';

describe('Hotel', () => {
  let testRooms, testBookings, hotel;

  beforeEach(() => {
    testRooms = [
      new Room({
        number: 14,
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
    testBookings = [
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
      }),
      new Booking({
        id: '90jsaova90uj0rio',
        userID: 3,
        date: '2020/08/01',
        roomNumber: 18,
        roomServiceCharges: []
      }),
      new Booking({
        id: '90jsaova90uj0rio',
        userID: 2,
        date: '2020/08/02',
        roomServiceCharges: []
      })
    ]
    hotel = new Hotel(testRooms, testBookings, '2020/08/02');
  })

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  })

  it('should contain all instances of Room and Booking', () => {
    expect(hotel.rooms).to.deep.equal(testRooms);
    expect(hotel.bookings).to.deep.equal(testBookings.slice(0, -1));
  })

  it('should filter out any invalid data', () => {
    expect(hotel.filterData(testBookings, 'Booking')).to.deep.equal(testBookings.slice(0, -1));
  })

  it('should hold an array of all bookings for a given date', () => {
    expect(hotel.bookingsForDay).to.deep.equal([testBookings[2]])
  })

  it('should know the total number of rooms available for a given day', () => {
    expect(hotel.roomsAvailableForDay.length).to.equal(2);
  })

  it('should be able to filter rooms by type', () => {
    expect(hotel.filterRoomsByType('bungalow')).to.deep.equal([testRooms[2]]);
  })

  it('should know which rooms are available for a given day', () => {
    expect(hotel.roomsAvailableForDay).to.deep.equal([testRooms[1], testRooms[2]]);
  })

  it('should know the percentage of rooms booked for a given day', () => {
    expect(hotel.occupationPercentageForDay).to.equal(33);
  })

  it('should be able to find the total revenue for a given day', () => {
    expect(hotel.revenueForDay).to.equal(500);
  })
})

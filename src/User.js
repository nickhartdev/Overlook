import Data from './Data.js';
import Booking from './Booking.js';
import Room from './Room.js';
import dataFetcher from './dataFetcher.js';

class User extends Data {
  constructor(userData, bookings, roomsData) {
    super();
    this.id = super.validateDataType(userData.id, 'number');
    this.name = super.validateDataType(userData.name, 'string');
    this.bookings = this.filterBookings(bookings);
    this.totalExpenditures = parseFloat(this.calculateTotalExpenditures(roomsData).toFixed(2));
    this.bookedRoomInfo = this.createBookedRoomInfo(this.bookings, roomsData);
  }

  filterBookings(bookings = []) {
    return bookings.filter(booking => booking.userID === this.id);
  }

  calculateTotalExpenditures(roomsData = []) {
    return this.bookings.reduce((totalSpent, booking) => {
      let roomMatch = roomsData.find(room => room.number === booking.roomNumber);
      if (!roomMatch) {
        roomMatch = {costPerNight: 0};
      }
      totalSpent += roomMatch.costPerNight;
      return totalSpent;
    }, 0)
  }

  createBookedRoomInfo(bookings, roomsData) {
    return this.bookings.reduce((roomsList, booking) => {
      const roomData = roomsData.find(room => room.number === booking.roomNumber);
      roomData.dateBooked = booking.date;
      roomsList.push(roomData);
      return roomsList;
    }, [])
  }
}

export default User;

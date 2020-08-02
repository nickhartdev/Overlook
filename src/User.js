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
  }

  filterBookings(bookings = []) {
    return bookings.filter(booking => booking.userID === this.id);
  }

  calculateTotalExpenditures(roomsData) {
    return this.bookings.reduce((totalSpent, booking) => {
      const roomMatch = roomsData.find(room => room.number === booking.roomNumber);
      totalSpent += roomMatch.costPerNight;
      return totalSpent;
    }, 0)
  }
}

export default User;

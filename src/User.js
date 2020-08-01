import Data from './Data.js';
import Booking from './Booking.js';
import dataFetcher from './dataFetcher.js';

class User extends Data {
  constructor(userData, bookings) {
    super();
    this.id = super.validateDataType(userData.id, 'number');
    this.name = super.validateDataType(userData.name, 'string');
    this.bookings = this.filterBookings(bookings);
  }

  filterBookings(bookings = []) {
    return bookings.filter(booking => booking.userID === this.id);
  }
}

export default User;

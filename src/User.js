import Data from './Data.js';
import Booking from './Booking.js';
import Room from './Room.js';

class User extends Data {
  constructor(userData, bookings, roomsData) {
    super();
    this.id = super.validateDataType(userData.id, 'number');
    this.name = super.validateDataType(userData.name, 'string');
    this.bookings = this.filterAndSortBookings(bookings);
    this.totalExpenditures = parseFloat(this.calculateTotalExpenditures(roomsData).toFixed(2));
    this.bookedRoomInfo = this.createBookedRoomInfo(this.bookings, roomsData);
  }

  filterAndSortBookings(bookings = []) {
    const filteredBookings = bookings.filter(booking => booking.userID === this.id);
    return filteredBookings.sort((a, b) => b.date - a.date);
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
    const bookedRooms = this.bookings.reduce((roomsList, booking) => {
      const roomData = roomsData.find(room => room.number === booking.roomNumber);
      roomData.dateBooked = booking.date;
      roomsList.push(roomData);
      return roomsList;
    }, []);
    return bookedRooms.sort((a, b) => new Date(a.dateBooked) - new Date(b.dateBooked));
  }
}

export default User;

import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';

const helper = {
  retrieveUserData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .then(userData => userData.users);
  },

  retrieveRoomData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .then(roomData => roomData.rooms.map(room => new Room(room)));
  },

  retrieveBookingData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .then(bookingData => bookingData.bookings.map(booking => new Booking(booking)));
  },

  async getUserByID(id) {
    const userData = await this.retrieveUserData();
    const bookingData = await this.retrieveBookingData();
    const currentUserData = userData.filter(user => user.id === id);

    return new User(currentUserData[0], bookingData);
  }
}

export default helper;

import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';

const dataFetcher = {
  retrieveUserData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .then(userData => userData.users);
  },

  retrieveAndInstantiateRoomData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .then(roomData => roomData.rooms.map(room => new Room(room)));
  },

  retrieveAndInstantiateBookingData() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .then(bookingData => bookingData.bookings.map(booking => new Booking(booking)));
  }
}

export default dataFetcher;

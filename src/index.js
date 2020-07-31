import './css/base.scss';
import './images/turing-logo.png';
import DOMUpdates from './DOMUpdates.js';

import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';

const retrieveUserData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(dataSet => dataSet.users.map(user => new User(user)))
  .then(userData => console.log(userData));
}

const retrieveRoomData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(dataSet => dataSet.rooms.map(room => new Room(room)))
  .then(roomData => console.log(roomData));
}

const retrieveBookingData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(dataSet => dataSet.bookings.map(booking => new Booking(booking)))
  .then(bookingsData => console.log(bookingsData))
}

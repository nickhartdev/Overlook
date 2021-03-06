import moment from 'moment';
import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';
import Hotel from './Hotel.js';

const dataHandler = {
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
  },

  async retrieveCustomerByID(customerID) {
    const customerData = await this.retrieveUserData();
    const bookingData = await this.retrieveAndInstantiateBookingData();
    const roomData = await this.retrieveAndInstantiateRoomData();
    const customerMatch = customerData.find(customer => customer.id === customerID);

    return new User(customerMatch, bookingData, roomData);
  },

  async retrieveHotelDataForDay(date = moment().format('YYYY/MM/DD')) {
    const roomData = await this.retrieveAndInstantiateRoomData();
    const bookingData = await this.retrieveAndInstantiateBookingData();

    return new Hotel(roomData, bookingData, date);
  },

  async postBookingData(userID, date, roomNumber) {
    const bookingData = {userID: userID, date: date, roomNumber: roomNumber};
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    })
      .then(response => response.json())
      .then(statusCode => console.log(statusCode))
      .catch(error => console.error(error));
  }
}

export default dataHandler;

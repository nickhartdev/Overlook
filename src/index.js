import './css/base.scss';
import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';
import Hotel from './Hotel.js';
import DOMUpdates from './DOMUpdates.js';
import dataHandler from './dataHandler.js';
import loginHandler from './loginHandler.js';
import moment from 'moment';

const domUpdates = new DOMUpdates();

document.addEventListener('click', (event) => {
  buttonHandler(event);
})

const buttonHandler = async (event) => {
  if (event.target.id === 'log-in-btn') {
    logIn();
  } else if (event.target.id === 'username' || event.target.id === 'password') {
    domUpdates.hideError();
  } else if (event.target.id === 'customer-booking-link') {
    domUpdates.displayUserBookingPage();
  } else if (event.target.id === 'home-link') {
    domUpdates.displayLandingPage();
  } else if (event.target.id === 'booking-search-btn') {
    const date = domUpdates.getDateFromForm();
    const roomType = domUpdates.getRoomTypeFromForm();
    checkAndDisplayAvailableRooms(date, roomType);
  } else if (event.target.classList.contains('more-info-btn')) {
    getAndDisplayRoomMatch(event.target.id);
  } else if (event.target.id === 'back-to-search-link') {
    domUpdates.displayUserBookingPage();
  }
}

const logIn = async () => {
  const loginCredentials = domUpdates.checkLoginResponse();
  if (loginCredentials.isValid) {
    loginCredentials.username.includes('customer') ? await startCustomerApp(loginCredentials.username) : await startManagerApp();
  } else {
    domUpdates.displayError();
  }
}

const checkAndDisplayAvailableRooms = async (date, roomType) => {
  const hotelData = await dataHandler.retrieveHotelDataForDay(date);
  if (roomType) {
    domUpdates.populateAvailableRooms(hotelData.filterRoomsByType(roomType));
  } else {
    domUpdates.populateAvailableRooms(hotelData.roomsAvailableForDay);
  }
}

const getAndDisplayRoomMatch = async (roomNumber) => {
  const rooms = await dataHandler.retrieveAndInstantiateRoomData();
  const roomMatch = rooms.find(room => room.number == roomNumber);

  domUpdates.displayRoomBookingPage(roomMatch);
}

const startCustomerApp = async (username) => {
  const customerID = loginHandler.validateCustomerID(username).customerID;
  const currentCustomer = await dataHandler.retrieveCustomerByID(customerID);
  domUpdates.currentUser = username;
  domUpdates.displayLandingPage();
  domUpdates.updateWelcomeMessage(currentCustomer);
  domUpdates.populateCustomerBookings(currentCustomer.bookedRoomInfo);
  domUpdates.displayCustomerExpenditures(currentCustomer);
}

const startManagerApp = async () => {
  const hotelInfo = await dataHandler.retrieveHotelDataForDay();
  domUpdates.currentUser = 'manager';
  domUpdates.displayLandingPage();
  domUpdates.displayTodaysDate();
  domUpdates.displayNumberOfRoomsAvailableForDay(hotelInfo.roomsAvailableForDay.length);
  domUpdates.displayOccupationPercentageForDay(hotelInfo.occupationPercentageForDay);
  domUpdates.displayTotalRevenueForDay(hotelInfo.revenueForDay);
}

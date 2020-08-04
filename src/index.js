import './css/base.scss';
import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';
import Hotel from './Hotel.js';
import DOMUpdates from './DOMUpdates.js';
import dataFetcher from './dataFetcher.js';
import loginHandler from './loginHandler.js';
import moment from 'moment';

const domUpdates = new DOMUpdates();

document.addEventListener('click', (event) => {
  buttonHandler(event);
})

const buttonHandler = (event) => {
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
    console.log(roomType);
    checkAndDisplayAvailableRooms(date, roomType);
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

const checkAndDisplayAvailableRooms = async (date, types) => {
  const hotelData = await dataFetcher.retrieveHotelDataForDay(date);
  if (types) {
    domUpdates.populateAvailableRooms(hotelData.filterRoomsByType(types));
  } else {
    domUpdates.populateAvailableRooms(hotelData.roomsAvailableForDay);
  }
}

const startCustomerApp = async (username) => {
  const customerID = loginHandler.validateCustomerID(username).customerID;
  const currentCustomer = await dataFetcher.retrieveCustomerByID(customerID);
  domUpdates.currentUser = username;
  domUpdates.displayLandingPage();
  domUpdates.updateWelcomeMessage(currentCustomer);
  domUpdates.populateCustomerBookings(currentCustomer.bookedRoomInfo);
  domUpdates.displayCustomerExpenditures(currentCustomer);
}

const startManagerApp = async () => {
  const hotelInfo = await dataFetcher.retrieveHotelDataForDay();
  domUpdates.currentUser = 'manager';
  domUpdates.displayLandingPage();
  domUpdates.displayTodaysDate();
  domUpdates.displayNumberOfRoomsAvailableForDay(hotelInfo.roomsAvailableForDay.length);
  domUpdates.displayOccupationPercentageForDay(hotelInfo.occupationPercentageForDay);
  domUpdates.displayTotalRevenueForDay(hotelInfo.revenueForDay);
}

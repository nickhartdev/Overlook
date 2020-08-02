import './css/base.scss';

import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';
import Hotel from './Hotel.js';
import domUpdates from './DOMUpdates.js';
import dataFetcher from './dataFetcher.js';
import loginHandler from './loginHandler.js';

document.addEventListener('click', (event) => {
  clickHandler(event);
})

const clickHandler = (event) => {
  if (event.target.id === 'log-in-btn') {
    logIn();
  } else if (event.target.id === 'username' || event.target.id === 'password') {
    domUpdates.hideError();
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

const startCustomerApp = async (username) => {
  const currentCustomer = await getCurrentCustomer(username);
  domUpdates.displayLandingPage('customer');
  domUpdates.updateWelcomeMessage(currentCustomer);
  domUpdates.populateUserBookings(currentCustomer.bookings);
}

const startManagerApp = () => {
  domUpdates.displayLandingPage('manager');
}

const getCurrentCustomer = async (username) => {
  const allUsers = await dataFetcher.retrieveUserData();
  const allRooms = await dataFetcher.retrieveAndInstantiateRoomData();
  const allBookings = await dataFetcher.retrieveAndInstantiateBookingData();
  const userID = loginHandler.validateCustomerID(username).customerID;
  const userMatch = allUsers.find(user => user.id === userID);

  return new User(userMatch, allBookings);
}

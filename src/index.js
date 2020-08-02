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
  const userID = loginHandler.validateCustomerID(username).customerID;
  const currentCustomer = await dataFetcher.retrieveCustomerByID(userID);
  domUpdates.displayLandingPage('customer');
  domUpdates.updateWelcomeMessage(currentCustomer);
  domUpdates.populateCustomerBookings(currentCustomer.bookings);
  domUpdates.displayCustomerExpenditures(currentCustomer);
}

const startManagerApp = () => {
  domUpdates.displayLandingPage('manager');
}

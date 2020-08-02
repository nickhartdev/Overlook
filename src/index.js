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


// All starts when the log in button is clicked
// Based on whether or not the username includes manager or customer
// run a different startApp function with different fetch requests

// start with how to identify the user type

const clickHandler = (event) => {
  if (event.target.id === 'log-in-btn') {
    logIn();
  } else if (event.target.id === 'username' || event.target.id === 'password') {
    domUpdates.hideError();
  }
}

const logIn = () => {
  const loginCredentials = domUpdates.checkLoginResponse();
  if (loginCredentials.isValid) {
    loginCredentials.username.includes('customer') ? startCustomerApp() : startManagerApp();
  } else {
    domUpdates.displayError();
  }
}

const startCustomerApp = () => {
  domUpdates.displayLandingPage('customer');
}

const startManagerApp = () => {
  domUpdates.displayLandingPage('manager');
}

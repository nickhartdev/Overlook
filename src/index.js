import './css/base.scss';

import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';
import Hotel from './Hotel.js';
import domUpdates from './DOMUpdates.js';
import dataFetcher from './dataFetcher.js';
import loginHandler from './loginHandler.js';

window.onload = () => {
  startApp();
}

document.addEventListener('click', (event) => {
  clickHandler(event);
})

const clickHandler = (event) => {
  if (event.target.id === 'log-in-btn') {
    domUpdates.displayLoginResponse();
  } else if (event.target.id === 'username' || event.target.id === 'password') {
    domUpdates.hideError();
  }
}

const startApp = () => {
  return Promise.all([
    dataFetcher.retrieveUserData(),
    dataFetcher.retrieveRoomData(),
    dataFetcher.retrieveBookingData()
  ])
    .then(dataSets => new Hotel(dataSets[0], dataSets[1], dataSets[2]))
    .then(hotel => {
      // actually don't need to do anything with current user here
    });
}

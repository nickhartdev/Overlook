import './css/base.scss';
import './images/turing-logo.png';

import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';
import domUpdates from './DOMUpdates.js';
import dataFetcher from './dataFetcher.js';
import login from './loginHandler.js';

document.addEventListener('click', (event) => {
  clickHandler(event);
});

function clickHandler(event) {
  if (event.target.id === 'log-in-btn') {
    validateLogIn();
  }
}

import './css/base.scss';
import './images/turing-logo.png';

import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';
import DOMUpdate from './DOMUpdates.js';
import helper from './helper.js';

window.onload = (event) => {
  showUserInfo(1);
};

async function showUserInfo(id) {
  const domUpdate = new DOMUpdate();
  const currentUser = await helper.getUserByID(id);

  domUpdate.displayData(currentUser, '.data');
}

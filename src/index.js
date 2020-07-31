import './css/base.scss';
import './images/turing-logo.png';

import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';
import DOMUpdate from './DOMUpdates.js';
import dataFetcher from './data-fetcher.js';

async function showUserInfo(id) {
  const domUpdate = new DOMUpdate();
  const currentUser = await dataFetcher.getUserByID(id);

  domUpdate.displayData(currentUser, '.data');
}

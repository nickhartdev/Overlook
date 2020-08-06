import './images/junior-suite.jpg'
import './images/residential-suite.jpg'
import './images/suite.jpg'
import './images/single-room.jpg'
import './css/base.scss';
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
    refreshCustomerApp(domUpdates.currentUser);
  } else if (event.target.id === 'booking-search-btn') {
    checkAndDisplayAvailableRooms(domUpdates.getRoomTypeFromForm());
  } else if (event.target.classList.contains('more-info-btn')) {
    getAndDisplayRoomMatch(event.target.id);
  } else if (event.target.id === 'back-to-search-link') {
    domUpdates.displayUserBookingPage('revisit');
  } else if (event.target.classList.contains('room-booking-btn')) {
    bookRoom(event);
  } else if (event.target.id === 'clear-search-btn') {
    domUpdates.resetSearchForm()
  } else if (event.target.id === 'log-out-btn') {
    domUpdates.displayLoginPage();
  }
}

const logIn = async () => {
  const loginCredentials = domUpdates.checkLoginResponse();
  if (loginCredentials.isValid) {
    loginCredentials.username.includes('customer') ? await refreshCustomerApp(loginCredentials.username) : await startManagerApp();
  } else {
    domUpdates.displayError();
  }
}

const checkAndDisplayAvailableRooms = async (roomType) => {
  domUpdates.date = domUpdates.getDateFromForm()
  const hotelData = await dataHandler.retrieveHotelDataForDay(domUpdates.date);
  if (roomType) {
    const roomsByType = hotelData.filterRoomsByType(roomType);
    roomsByType.length === 0 ? domUpdates.displayApologyPage() : domUpdates.populateAvailableRooms(roomsByType, domUpdates.date);
  } else {
    const availableRooms = hotelData.roomsAvailableForDay;
    availableRooms.length === 0 ? domUpdates.displayApologyPage() : domUpdates.populateAvailableRooms(availableRooms, domUpdates.date);
  }
}

const getAndDisplayRoomMatch = async (roomNumber) => {
  const rooms = await dataHandler.retrieveAndInstantiateRoomData();
  const roomMatch = rooms.find(room => room.number == roomNumber);

  domUpdates.displayRoomInfoPopUp(roomMatch);
}

const bookRoom = (event) => {
  const userID = loginHandler.validateCustomerID(domUpdates.currentUser).customerID;
  const date = domUpdates.date;
  const roomNumber = parseInt(event.target.id);
  dataHandler.postBookingData(userID, date, roomNumber);
  domUpdates.displayUserBookingPage('revisit');
  alert(`Room ${roomNumber} booked!`);
}

const refreshCustomerApp = async (username) => {
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

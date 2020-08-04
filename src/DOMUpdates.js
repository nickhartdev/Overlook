import loginHandler from './loginHandler.js';
import moment from 'moment';

class DOMUpdates {
  constructor() {
    this.currentUser = null;
    this.date = null;
  }

  checkLoginResponse(handler = loginHandler) {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    return {isValid: handler.validateLogin(username, password), username: username};
  }

  displayError() {
    const usernameField = document.querySelector('#username');
    const passwordField = document.querySelector('#password');
    const errorMessage = document.querySelector('#error-message');

    errorMessage.classList.remove('hidden');
    usernameField.value = '';
    passwordField.value = '';
  }

  hideError() {
    const errorMessage = document.querySelector('#error-message');
    if (!errorMessage.classList.contains('hidden')) errorMessage.classList.add('hidden');
  }

  displayLandingPage() {
    this.changeElementsVisibility('hide', ['#log-in-form']);
    if (this.currentUser.includes('customer')) {
      this.changeElementsVisibility('show', [
        '#customer-landing-page',
        'nav',
        '#customer-booking-link',
        '#customer-bookings',
        '#customer-expenditure'
      ]);
      this.changeElementsVisibility('hide', [
        '#customer-booking-page',
        '#home-link',
        '#back-to-search-link',
        '#room-booking-page',
        'fieldset',
        '#date-selector-header',
        '#date-selector',
        '#booking-search-btn',
        '#room-type-tags',
        '#available-rooms'
      ]);
    } else if (this.currentUser === 'manager') {
      this.changeElementsVisibility('show', ['#manager-landing-page']);
    }
  }

  displayUserBookingPage() {
    this.changeElementsVisibility('show', [
      '#customer-booking-page',
      '#home-link',
      '#available-rooms',
      '#date-selector-header',
      '#date-selector',
      '#booking-search-btn',
      '#room-type-tags',
      '#clear-search-btn'
    ]);
    this.changeElementsVisibility('hide', [
      '#customer-landing-page',
      '#customer-booking-link',
      '#room-booking-page',
      '#customer-bookings',
      '#customer-expenditure'
    ]);
  }

  displayRoomBookingPage(room = {roomType: 'Uh oh. Looks like we had an error'}) {
    const roomBookingPage = document.querySelector('#room-booking-page');
    this.changeElementsVisibility('show', [
      '#room-booking-page',
      '#back-to-search-link'
    ]);
    this.changeElementsVisibility('hide', [
      '#customer-booking-page',
      '#available-rooms',
      '#clear-search-btn'
    ]);

    roomBookingPage.innerHTML =
    ` <h1>For ${moment(this.date).format('dddd, MMMM do YYYY')}</h1>
      <p>${room.roomType}</p>
      <p>${room.number}</p>
      <button class="room-booking-btn" id="${room.number}">Book</button>`;
  }

  displayApologyPage() {
    this.changeElementsVisibility('show', ['#apology-page', '#back-to-search-link']);
    this.changeElementsVisibility('hide', ['#available-rooms', '#customer-booking-page']);
  }

  changeElementsVisibility(visibilityChange, elementSelectors) {
    elementSelectors.forEach(elementSelector => {
      const element = document.querySelector(elementSelector);
      if (visibilityChange === 'show') {
        element.classList.remove('hidden');
      } else if (visibilityChange === 'hide') {
        element.classList.add('hidden');
      }
    })
  }

  updateWelcomeMessage(customer = {name: '- uh oh. Looks like we had an error'}) {
    const welcomeMessage = document.querySelector('#welcome-message');
    welcomeMessage.innerHTML = `Welcome ${customer.name}`;
  }

  displayCustomerExpenditures(customer = {totalExpenditures: 0}) {
    const customerExpenditure = document.querySelector('#customer-expenditure');
    customerExpenditure.innerHTML = `Your total for all bookings is ${customer.totalExpenditures}.`
  }

  populateCustomerBookings(bookedRooms = []) {
    const customerBookings = document.querySelector('#customer-bookings');
    bookedRooms.forEach(bookedRoom => {
      customerBookings.innerHTML += `
      <section role="figure" class="customer-booking">
        <p role="heading">${bookedRoom.dateBooked}</p>
        <p>Room ${bookedRoom.number}</p>
        <p>${bookedRoom.roomType}</p>
      </section>
      `
    })
  }

  getDateFromForm() {
    const datePicker = document.querySelector('#date-selector');
    let date;
    if (datePicker.value) {
      date = moment(datePicker.value).format('YYYY/MM/DD');
    } else {
      date = moment().format('YYYY/MM/DD');
    }
    return date;
  }

  getRoomTypeFromForm() {
    const roomTypeButtons = document.querySelectorAll('input[name="room-type"]');
    let roomType;
    roomTypeButtons.forEach(button => {
      if (button.checked) {
        roomType = button.value;
      }
    })
    return roomType;
  }

  resetSearchForm() {
    const roomTypeButtons = document.querySelectorAll('input[name="room-type"]');
    const datePicker = document.querySelector('#date-selector');

    datePicker.value = '';
    roomTypeButtons.forEach(button => {
      button.checked = false;
    });
    this.changeElementsVisibility('hide', ['#available-rooms']);
  }

  populateAvailableRooms(availableRooms = []) {
    this.changeElementsVisibility('show', ['#available-rooms']);
    const availableRoomsSection = document.querySelector('#available-rooms');
    availableRoomsSection.innerHTML = '';
    availableRooms.forEach(room => {
      availableRoomsSection.innerHTML += `
        <h1>${room.roomType}</h1>
        <p>${room.number}</p>
        <button type="button" class="more-info-btn" id="${room.number}">More Info</button>
      `
    })
  }

  displayTodaysDate() {
    const todaysDate = document.querySelector('#todays-date');
    todaysDate.innerHTML = `${moment().format('MM/DD/YYYY')}`;
  }

  displayNumberOfRoomsAvailableForDay(numberOfRooms = 0) {
    const totalRoomsAvailable = document.querySelector('#total-rooms-available');
    totalRoomsAvailable.innerHTML = `${numberOfRooms} rooms are still available for today.`;
  }

  displayTotalRevenueForDay(revenueForDay = 0) {
    const totalRevenue = document.querySelector('#total-revenue');
    totalRevenue.innerHTML = `Total revenue for the day so far is $${revenueForDay}.`;
  }

  displayOccupationPercentageForDay(percentage = 0) {
    const occupationPercentage = document.querySelector('#occupation-percentage');
    occupationPercentage.innerHTML = `${percentage}% of rooms are occupied for today.`;
  }
}

export default DOMUpdates;

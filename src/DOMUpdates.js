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
    if (!errorMessage.classList.contains('hidden')) {
      errorMessage.classList.add('hidden');
    }
  }

  displayLandingPage() {
    this.changeBackgroundImage('none');
    if (this.currentUser.includes('customer')) {
      this.hideAllCards('.available-room-card');
      this.changeElementsVisibility('show', [
        '#customer-landing-page',
        'nav',
        '#customer-booking-link',
        '#customer-bookings',
        '#customer-expenditure'
      ]);
      this.changeElementsVisibility('hide', [
        '#log-in-form',
        '#log-in-message',
        '#customer-booking-page',
        '#home-link',
        'fieldset',
        '#search-page-header',
        '#date-selector',
        '#booking-search-btn',
        '#room-search-form',
        '#available-rooms',
        '#clear-search-btn',
        '#apology-page',
        '#room-info-popup'
      ]);
    } else if (this.currentUser === 'manager') {
      this.changeElementsVisibility('show', ['#manager-landing-page', 'nav']);
      this.changeElementsVisibility('hide', [
        '#log-in-message',
        '#log-in-form',
        'fieldset',
        '#customer-booking-link',
        '#home-link',
      ]);
    }
  }

  displayLoginPage() {
    this.currentUser = null;
    this.date = null;
    this.changeBackgroundImage('url(../images/landing-page.jpg)')
    this.changeElementsVisibility('show', ['fieldset', '#log-in-form', '#log-in-message']);
    this.changeElementsVisibility('hide', [
      '#customer-landing-page',
      'nav',
      '#customer-booking-link',
      '#customer-bookings',
      '#customer-expenditure',
      '#customer-booking-page',
      '#home-link',
      '#search-page-header',
      '#date-selector',
      '#booking-search-btn',
      '#room-search-form',
      '#available-rooms',
      '#clear-search-btn',
      '#apology-page',
      '#room-info-popup',
      '#manager-landing-page'
    ]);
  }

  displayUserBookingPage() {
    this.changeElementsVisibility('show', [
      '#customer-booking-page',
      '#home-link',
      '#available-rooms',
      '#search-page-header',
      '#date-selector',
      '#booking-search-btn',
      '#room-search-form',
      '#clear-search-btn'
    ]);
    this.changeElementsVisibility('hide', [
      '#customer-landing-page',
      '#customer-booking-link',
      '#customer-bookings',
      '#customer-expenditure',
      '#available-rooms',
      '#apology-page',
      '#room-info-popup',
      '#body-blackout'
    ]);
  }

  displayRoomInfoPopUp(room = {roomType: 'Uh oh. Looks like we had an error'}) {
    const roomInfoPopUp = document.querySelector('#room-info-popup');

    this.changeElementsVisibility('show', [
      '#room-info-popup',
      '#body-blackout'
    ]);
    roomInfoPopUp.innerHTML =
      `<h1 id="booking-page-header">More about room ${room.number}:</h1>
      <p class="room-popup-text">This room is one of our ${room.roomType}s.</p>
      <p class="room-popup-text">Bed size(s): ${this.capitalizeFirstLetter(room.bedSize)}</p>
      <p class="room-popup-text">Number of beds: ${room.numBeds}</p>
      <p class="room-popup-text">Cost per night: $${room.costPerNight}</p>
      <p class="room-popup-text">Would you like to book this room for ${moment(this.date).format('dddd, MMMM do YYYY')}?</p>
      <button class="room-booking-btn" id="${room.number}">Book</button>
      <button type="button" id="back-to-search-link">Back to your search</button>`;
  }

  hideAllCards(cardSelector) {
    const cards = document.querySelectorAll(cardSelector);
    cards.forEach(card => {
      card.classList.add('hidden');
    })
  }

  changeBackgroundImage(content) {
    const body = document.querySelector('body');
    body.style.background = content
  }

  displayApologyPage() {
    this.changeElementsVisibility('show', ['#apology-page']);
    this.changeElementsVisibility('hide', [
      '#available-rooms',
      '#customer-booking-page',
      '#room-search-form',
      '#search-page-header'
    ]);
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
    welcomeMessage.innerHTML = `Welcome ${this.getFirstWord(customer.name)}.`;
  }

  displayCustomerExpenditures(customer = {totalExpenditures: 0}) {
    const customerExpenditure = document.querySelector('#customer-expenditure');
    customerExpenditure.innerHTML = `Your current total for all of your bookings so far is ${customer.totalExpenditures}.`
  }

  populateCustomerBookings(bookedRooms = []) {
    const customerBookings = document.querySelector('#customer-bookings');
    customerBookings.innerHTML = '';
    bookedRooms.forEach(bookedRoom => {
      customerBookings.innerHTML += `
      <section role="figure" class="customer-booking booking-card card ${this.getFirstWord(bookedRoom.roomType)}">
        <p role="heading" class="booking-date-text">${bookedRoom.dateBooked}</p>
        <p class="booking-description">${this.capitalizeFirstLetter(bookedRoom.roomType)}</p>
      </section>
      `
    })
    this.addRoomImages();
  }

  addRoomImages() {
    const roomCards = document.querySelectorAll('.card');
    roomCards.forEach(card => {
      if (card.classList.contains('junior')) {
        card.style.backgroundImage = "url('./images/junior-suite.jpg')"
      } else if (card.classList.contains('suite')) {
        card.style.backgroundImage = "url('./images/suite.jpg')"
      } else if (card.classList.contains('residential')) {
        card.style.backgroundImage = "url('./images/residential-suite.jpg')"
      } else {
        card.style.backgroundImage = "url('./images/single-room.jpg')"
      }
    })
  }

  getFirstWord(text) {
    return text.split(' ')[0];
  }

  capitalizeFirstLetter(text) {
    const words = text.toLowerCase().split(' ');
    const newPhrase = []
    words.forEach(word => {
      const capitalizedWord = word.charAt(0).toUpperCase() + word.substring(1);
      newPhrase.push(capitalizedWord);
    })
    return newPhrase.join(' ');
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

    this.changeElementsVisibility('hide', ['#available-rooms']);
    this.hideAllCards('.available-room-card')
    datePicker.value = '';
    roomTypeButtons.forEach(button => {
      button.checked = false;
    });
  }

  populateAvailableRooms(availableRooms = []) {
    this.changeElementsVisibility('show', ['#available-rooms']);
    const availableRoomsSection = document.querySelector('#available-rooms');
    availableRoomsSection.innerHTML = '';
    availableRooms.forEach(room => {
      availableRoomsSection.innerHTML += `
      <section role="figure" class="available-room-card card ${this.getFirstWord(room.roomType)}">
        <h1 class="room-description">${this.capitalizeFirstLetter(room.roomType)}</h1>
        <button type="button" class="more-info-btn" id="${room.number}">More Info</button>
      </section>
      `
    this.addRoomImages();
    })
  }

  displayTodaysDate() {
    const todaysDate = document.querySelector('#todays-date');
    todaysDate.innerHTML = `Info for ${moment().format('MM/DD/YYYY')}:`;
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

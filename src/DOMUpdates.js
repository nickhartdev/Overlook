import loginHandler from './loginHandler.js';
import moment from 'moment';

const domUpdates = {
  checkLoginResponse(handler = loginHandler) {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    return {isValid: handler.validateLogin(username, password), username: username};
  },

  displayError() {
    const usernameField = document.querySelector('#username');
    const passwordField = document.querySelector('#password');
    const errorMessage = document.querySelector('#error-message');

    errorMessage.classList.remove('hidden');
    usernameField.value = '';
    passwordField.value = '';
  },

  hideError() {
    const errorMessage = document.querySelector('#error-message');
    if (!errorMessage.classList.contains('hidden')) errorMessage.classList.add('hidden');
  },

  displayLandingPage(userType) {
    this.changeElementsVisibility('hide', ['#log-in-form']);
    if (userType === 'customer') {
      this.changeElementsVisibility('show', ['#customer-landing-page', 'nav']);
      this.changeElementsVisibility('hide', ['#home-link']);
    } else if (userType === 'manager') {
      this.changeElementsVisibility('show', ['#manager-landing-page']);
    }
  },

  displayUserBookingPage() {
    this.changeElementsVisibility('show', ['#customer-booking-page', '#home-link']);
    this.changeElementsVisibility('hide', ['#customer-landing-page', '#customer-booking-link']);
  },

  changeElementsVisibility(visibilityChange, elementSelectors) {
    elementSelectors.forEach(elementSelector => {
      const element = document.querySelector(elementSelector);
      if (visibilityChange === 'show') {
        element.classList.remove('hidden');
      } else if (visibilityChange === 'hide') {
        element.classList.add('hidden');
      }
    })
  },

  updateWelcomeMessage(customer = {name: '- uh oh. Looks like we had an error'}) {
    const welcomeMessage = document.querySelector('#welcome-message');
    welcomeMessage.innerHTML = `Welcome ${customer.name}`;
  },

  displayCustomerExpenditures(customer = {totalExpenditures: 0}) {
    const customerExpenditure = document.querySelector('#customer-expenditure');
    customerExpenditure.innerHTML = `Your total for all bookings is ${customer.totalExpenditures}`
  },

  populateCustomerBookings(bookedRooms = []) {
    const customerBookings = document.querySelector('#customer-bookings');
    bookedRooms.forEach(bookedRoom => {
      customerBookings.innerHTML += `
      <section role="figure">
        <p role="heading">On ${bookedRoom.dateBooked}:</p>
        <p>Room ${bookedRoom.number}</p>
        <p>${bookedRoom.roomType}</p>
      </section>
      `
    })
  },

  displayTodaysDate() {
    const todaysDate = document.querySelector('#todays-date');
    todaysDate.innerHTML = `${moment().format('MM/DD/YYYY')}`;
  },

  displayRoomsAvailableForDay(numberOfRooms = 0) {
    const totalRoomsAvailable = document.querySelector('#total-rooms-available');
    totalRoomsAvailable.innerHTML = `${numberOfRooms} rooms are still available for today.`;
  },

  displayTotalRevenueForDay(revenueForDay = 0) {
    const totalRevenue = document.querySelector('#total-revenue');
    totalRevenue.innerHTML = `Total revenue for the day so far is $${revenueForDay}.`;
  },

  displayOccupationPercentageForDay(percentage = 0) {
    const occupationPercentage = document.querySelector('#occupation-percentage');
    occupationPercentage.innerHTML = `${percentage}% of rooms are occupied for today.`;
  }
}

export default domUpdates;

import loginHandler from './loginHandler.js';

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
      this.changeElementsVisibility('show', ['#customer-landing-page']);
    } else if (userType === 'manager') {
      this.changeElementsVisibility('show', ['#manager-landing-page']);
    }
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

  updateWelcomeMessage(user = {name: '- uh oh. Looks like we had an error'}) {
    const welcomeMessage = document.querySelector('#welcome-message');
    welcomeMessage.innerHTML = `Welcome ${user.name}`;
  },

  populateUserBookings(bookings = []) {
    const userBookings = document.querySelector('#user-bookings');
    bookings.forEach(booking => {
      userBookings.innerHTML += `
      <p>On ${booking.date}:</p>
      <ul>
        <li>${booking.roomNumber}</li>
      </ul>
      `
    })
  }
}

export default domUpdates;

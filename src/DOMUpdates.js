import loginHandler from './loginHandler.js';

const domUpdates = {
  clickHandler(event) {
    if (event.target.id === 'log-in-btn') {
      this.displayLoginResponse();
    } else if (event.target.id === 'username' || event.target.id === 'password') {
      this.hideError();
    }
  },

  displayLoginResponse(handler = loginHandler) {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    handler.validateLogin(username, password) ? this.displayLandingPage(username) : this.displayError(username);
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

  displayLandingPage(username) {
    this.changeElementsVisibility('hide', ['#log-in-form']);
    if (username.includes('customer')) {
      this.changeElementsVisibility('show', ['#welcome-message', '#user-expenditure', '#user-bookings']);
    } else if (username.includes('manager')) {
      this.changeElementsVisibility('show', ['#total-rooms-available', '#total-revenue', '#percentage-rooms-occupied']);
    }
  },

  changeElementsVisibility(visibilityChange, elementSelectors) {
    elementSelectors.forEach(elementSelector => {
      const element = document.querySelector(elementSelector);
      console.log(element);
      if (visibilityChange === 'show') {
        element.classList.remove('hidden');
        console.log(element.classList);
      } else if (visibilityChange === 'hide') {
        element.classList.add('hidden');
        console.log(element.classList);
      }
    })
  }
}

export default domUpdates;

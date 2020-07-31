import loginHandler from './loginHandler.js';

const domUpdates = {
  clickHandler(event) {
    if (event.target.id === 'log-in-btn') {
      this.displayLoginResponse();
    }
  },

  displayLoginResponse() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    loginHandler.validateLogin(username, password) ? this.displayLandingPage() : this.displayError(username);
  },

  displayError() {
    const usernameField = document.querySelector('#username');
    const passwordField = document.querySelector('#password');

    console.log('uh oh');
    username.value = '';
    password.value = '';
  },

  displayLandingPage(username) {
    console.log('success!');
  }
}

export default domUpdates;

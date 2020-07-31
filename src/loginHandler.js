const loginHandler = {
  validateLogin(username, password) {
    if (username.includes('customer')) {
      return this.validateUserId(username) ? this.validatePassword(password) : false;
    } else if (username.includes('manager')) {
      return this.validatePassword(password);
    } else {
      return false;
    }
  },

  validateUserId(username) {
    const customerID = username.substr(8);
    return customerID < 50 && customerID > 0;
  },

  validatePassword(password) {
    return password === 'overlook2020';
  }
}

export default loginHandler;

const loginHandler = {
  validateLogin(username, password) {
    if (username.includes('customer')) {
      return this.validateCustomerID(username).isValid ? this.validatePassword(password) : false;
    } else if (username === 'manager') {
      return this.validatePassword(password);
    } else {
      return false;
    }
  },

  validateCustomerID(username) {
    const customerID = parseInt(username.substr(8));
    const isValid = customerID <= 50 && customerID > 0 && username.length === 9 || username.length === 10;

    return !isValid ? {isValid: isValid} : {isValid: isValid, customerID: customerID};
  },

  validatePassword(password) {
    return password === 'overlook2020';
  }
}

export default loginHandler;

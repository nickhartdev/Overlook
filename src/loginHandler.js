const loginHandler = {
  validateLogin(username, password) {
    if (username.includes('customer')) {
      this.validateCustomerUserName(username);
    } else if (username.includes('manager2020')) {
      validatePassword(password);
    } else {
      return false;
    }
  },

  getUserId(username) {
    let customerID;
    if (username.length === 10) {
      customerID = parseInt(username.slice(-2, username.length));
    } else if (username.length === 9) {
      customerID = parseInt(username.slice(-1));
    }
    return customerID;
  }

  // check if the username has either customer or manager
  // if customer, check last two characters
  // they must be between 0 and 50
  // if they are, return that id
}

export default loginHandler;

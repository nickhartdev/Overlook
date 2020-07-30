import Data from './Data.js';

class User extends Data {
  constructor(userData, bookingsData) {
    super();
    this.id = super.validateDataType(userData.id, 'number');
    this.name = super.validateDataType(userData.name, 'string');
  }
}

export default User;

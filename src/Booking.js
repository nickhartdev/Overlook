import Data from './Data.js';

class Booking extends Data {
  constructor(bookingData) {
    super();
    this.id = super.validateDataType(bookingData.id, 'string');
  }
}

export default Booking;

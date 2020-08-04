import Data from './Data.js';

class Booking extends Data {
  constructor(bookingData) {
    super();
    this.id = super.validateDataType(bookingData.id, ['string', 'number']);
    this.userID = super.validateDataType(bookingData.userID, ['number']);
    this.date = super.validateDataType(bookingData.date, ['string']);
    this.roomNumber = super.validateDataType(bookingData.roomNumber, ['number']);
    this.roomServiceCharges = super.validateDataType(bookingData.roomServiceCharges, ['object']);
  }
}

export default Booking;

import Data from './Data.js';

class Room extends Data {
  constructor(roomData) {
    super();
    this.number = super.validateDataType(roomData.number, ['number']);
    this.roomType = super.validateDataType(roomData.roomType, ['string']);
    this.bidet = super.validateDataType(roomData.bidet, ['boolean']);
    this.bedSize = super.validateDataType(roomData.bedSize, ['string']);
    this.numBeds = super.validateDataType(roomData.numBeds, ['number']);
    this.costPerNight = super.validateDataType(roomData.costPerNight, ['number']);
  }
}

export default Room;

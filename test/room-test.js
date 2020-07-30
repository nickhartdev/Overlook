import { expect } from 'chai';
import Room from '../src/Room.js';

describe('Room', () => {
  let testRoomData, room;

  beforeEach(() => {
    testRoomData = {
      number: 1,
      roomType: 'residential suite',
      bidet: false,
      bedSize: 'california king',
      numBeds: 1,
      costPerNight: 500.00
    }
    room = new Room(testRoomData);
  })

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  })

  it('should be an instance of Room', () => {
    expect(room).to.be.an.instanceof(Room);
  })

  it('should be a child of Data', () => {
    expect(room.validateDataType).to.be.a('function');
  })

  it('should take in all attributes from a room data object', () => {
    expect(room.number).to.equal(testRoomData.number);
    expect(room.roomType).to.equal(testRoomData.roomType);
    expect(room.bidet).to.equal(testRoomData.bidet);
    expect(room.bedSize).to.equal(testRoomData.bedSize);
    expect(room.numBeds).to.equal(testRoomData.numBeds);
    expect(room.costPerNight).to.equal(testRoomData.costPerNight);
  })
})

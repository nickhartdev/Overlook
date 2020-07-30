import { expect } from 'chai';
import Room from '../src/Room.js';

describe('Room', () => {
  let room, testRoomData;

  beforeEach(() => {
    room = new Room();
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
})

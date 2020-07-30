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
})

class Hotel {
  constructor(users, rooms, bookings) {
    this.users = this.filterInvalidData(users);
    this.rooms = this.filterInvalidData(rooms);
    this.bookings = this.filterInvalidData(bookings);
  }

  filterInvalidData(dataSet) {
    return dataSet.filter(data => !Object.values(data).includes(null));
  }
}

export default Hotel;

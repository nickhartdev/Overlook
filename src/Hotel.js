import moment from 'moment';

class Hotel {
  constructor(rooms, bookings) {
    this.rooms = this.filterInvalidData(rooms);
    this.bookings = this.filterInvalidData(bookings);
    this.bookingsForDay = this.findBookingsForDay(this.bookings);
  }

  filterInvalidData(dataSet) {
    return dataSet.filter(data => !Object.values(data).includes(null));
  }

  findBookingsForDay(bookings, date = moment().format('YYYY/MM/DD')) {
    const bookingsForDay = this.bookings.filter(booking => {
      return booking.date === date;
    })

    return bookingsForDay ? bookingsForDay : [];
  }
}

export default Hotel;

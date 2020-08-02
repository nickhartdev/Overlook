import moment from 'moment';

class Hotel {
  constructor(rooms, bookings) {
    this.rooms = this.filterAndSortData(rooms);
    this.bookings = this.filterAndSortData(bookings, 'needsToBeSorted');
  }

  filterAndSortData(dataSet, needsToBeSorted) {
    const filteredData = dataSet.filter(data => !Object.values(data).includes(null));
    if (needsToBeSorted) {
      return filteredData.sort((a, b) => b.date - a.date)
    } else {
      return filteredData;
    }
  }

  findBookingsForDay(date = moment().format('YYYY/MM/DD')) {
    const bookingsForDay = this.bookings.filter(booking => {
      return booking.date === date;
    })
    return bookingsForDay ? bookingsForDay : [];
  }

  findPercentageOfRoomsBookedForDay(date = moment().format('YYYY/MM/DD')) {
    return parseInt((this.findBookingsForDay(date).length / this.rooms.length) * 100);
  }
}

export default Hotel;

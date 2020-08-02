import moment from 'moment';

class Hotel {
  constructor(rooms, bookings, date) {
    this.rooms = this.filterAndSortData(rooms);
    this.bookings = this.filterAndSortData(bookings, 'needsToBeSorted');
    this.bookingsForDay = this.findBookingsForDay(date);
    this.occupationPercentageForDay = this.findPercentageOfRoomsBookedForDay(date);
    this.revenueForDay = this.findRevenueForDay(date);
    this.numberOfAvailableRoomsForDay = this.findNumberOfRoomsAvailableForDay(date);
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

  findRevenueForDay(date = moment().format('YYYY/MM/DD')) {
    const bookingsForDay = this.findBookingsForDay(date);
    return bookingsForDay.reduce((totalRevenue, booking) => {
      const roomMatch = this.rooms.find(room => room.number = booking.roomNumber);
      totalRevenue += roomMatch.costPerNight;
      return totalRevenue
    }, 0);
  }

  findNumberOfRoomsAvailableForDay(date = moment().format('YYYY/MM/DD')) {
    return this.rooms.length - this.findBookingsForDay(date).length;
  }
}

export default Hotel;

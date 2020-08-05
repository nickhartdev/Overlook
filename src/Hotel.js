import moment from 'moment';

class Hotel {
  constructor(rooms, bookings, date) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.bookingsForDay = this.findBookingsForDay(date);
    this.occupationPercentageForDay = this.findPercentageOfRoomsBookedForDay(date);
    this.revenueForDay = this.findRevenueForDay(date);
    this.roomsAvailableForDay = this.findRoomsAvailableForDay(date);
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
      return totalRevenue;
    }, 0);
  }

  findRoomsAvailableForDay(date = moment().format('YYYY/MM/DD')) {
    return this.rooms.filter(room => {
      return this.bookingsForDay.every(booking => {
        return booking.roomNumber !== room.number;
      })
    })
  }

  filterRoomsByType(type) {
    return this.roomsAvailableForDay.filter(room => {
      return type === room.roomType;
    })
  }
}

export default Hotel;

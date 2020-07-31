import './css/base.scss';
import './images/turing-logo.png';

retrieveUserData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json());
}

retrieveRoomData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json());
}

retrieveBookingData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json());
}

getData() {
  return Promise.all([this.retrieveUserData(), this.retrieveRoomData(), this.retrieveBookingData()])
  .then(dataSets => dataSets);
}

export default scripts;

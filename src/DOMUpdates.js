class DOMUpdate {
  displayData(user, selector) {
    const element = document.querySelector(selector);
    element.innerText = `${user.name}, ${user.bookings}`;
  }
}

export default DOMUpdate;

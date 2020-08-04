import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
import DOMUpdates from '../src/DOMUpdates.js';
chai.use(spies);

describe('domUpdate', () => {
  let domUpdates, mockLoginHandler, button;

  beforeEach(() => {
    button = {};
    domUpdates = new DOMUpdates();
    global.document = {};
    mockLoginHandler = {};
    chai.spy.on(document, ['querySelectorAll'], () => {
      return []
    })
    chai.spy.on(document, ['querySelector'], () => {
      return {
        value: '',
        classList: {
          remove: () => {},
          contains: () => {},
          add: () => {}
        }
      };
    });
    chai.spy.on(mockLoginHandler, ['validateLogin'], () => {});
  })

  afterEach(() => {
    chai.spy.restore();
  })

  it('should be able to change the visibiltiy of a list of given elements', () => {
    domUpdates.changeElementsVisibility('hide', ['element1', 'element2']);
    expect(document.querySelector).to.have.been.called(2);
  })

  it('should keep track of the current user', () => {
    expect(domUpdates.currentUser).to.equal(null);
  })

  it('should use validate login from the loginHandler to validate credentials', () => {
    domUpdates.checkLoginResponse(mockLoginHandler);
    expect(mockLoginHandler.validateLogin).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called(2);
    expect(document.querySelector).to.have.been.called.with('#username');
    expect(document.querySelector).to.have.been.called.with('#password');
  })

  it('should display an error when incorrect credentials are given', () => {
    domUpdates.displayError();
    expect(document.querySelector).to.have.been.called(3);
    expect(document.querySelector).to.have.been.called.with('#username');
    expect(document.querySelector).to.have.been.called.with('#password');
    expect(document.querySelector).to.have.been.called.with('#error-message');
  })

  it('should hide the error message when the user clicks on either input fields', () => {
    domUpdates.hideError();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#error-message');
  })

  it('should show the user\'s login screen when their credentials are correct', () => {
    domUpdates.currentUser = 'customer';
    domUpdates.displayLandingPage();
    expect(document.querySelector).to.have.been.called(6);
    expect(document.querySelector).to.have.been.called.with('#log-in-form');
    expect(document.querySelector).to.have.been.called.with('#customer-landing-page');
    expect(document.querySelector).to.have.been.called.with('#customer-booking-page');
    expect(document.querySelector).to.have.been.called.with('#customer-booking-link');
    expect(document.querySelector).to.have.been.called.with('nav');
    expect(document.querySelector).to.have.been.called.with('#home-link');
  })

  it('should show the manager\'s login screen when their credentials are correct', () => {
    domUpdates.currentUser = 'manager';
    domUpdates.displayLandingPage();
    expect(document.querySelector).to.have.been.called(2);
    expect(document.querySelector).to.have.been.called.with('#log-in-form');
    expect(document.querySelector).to.have.been.called.with('#manager-landing-page');
  })

  it('should be able to show a welcome message for a given user', () => {
    domUpdates.updateWelcomeMessage();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#welcome-message');
  })

  it('should be able to show the total amount a given user has spent', () => {
    domUpdates.displayCustomerExpenditures();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#customer-expenditure');
  })

  it('should populate a given user\'s booking info', () => {
    domUpdates.populateCustomerBookings();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#customer-bookings');
  })

  it('should display today\'s date', () => {
    domUpdates.displayTodaysDate();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#todays-date');
  })

  it('should show the number of rooms available for the day', () => {
    domUpdates.displayNumberOfRoomsAvailableForDay();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#total-rooms-available');
  })

  it('should show the total revenue for the day', () => {
    domUpdates.displayTotalRevenueForDay();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#total-revenue');
  })

  it('should show the occupation percentage for the day', () => {
    domUpdates.displayOccupationPercentageForDay();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#occupation-percentage');
  })

  it('should display the user booking page when the correct button is clicked', () => {
    domUpdates.displayUserBookingPage();
    expect(document.querySelector).to.have.been.called(4);
    expect(document.querySelector).to.have.been.called.with('#customer-booking-page');
    expect(document.querySelector).to.have.been.called.with('#home-link');
    expect(document.querySelector).to.have.been.called.with('#customer-landing-page');
    expect(document.querySelector).to.have.been.called.with('#customer-booking-link');
  })

  it('should return the value of a checked button from the user search form', () => {
    domUpdates.getRoomTypeFromForm();
    expect(document.querySelectorAll).to.have.been.called(1);
    expect(document.querySelectorAll).to.have.been.called.with('input[name="room-type"]');
  })

  // Spent forever figuring out how to mock addEventListener for this one - I'll need to
  // revisit this

  // it('should keep track of what date a user selects from the datePicker', () => {
  //   domUpdates.retrieveDateFromForm();
  //   expect(document.querySelector).to.have.been.called(1);
  //   expect(document.querySelector).to.have.been.called.with('#date-selector');
  // })
})

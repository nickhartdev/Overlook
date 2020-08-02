import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
import domUpdates from '../src/DOMUpdates.js';
chai.use(spies);

describe('domUpdate', () => {
  let mockLoginHandler;

  beforeEach(() => {
    global.document = {};
    mockLoginHandler = {};
    chai.spy.on(document, ['querySelector'], () => {
      return {
        value: '',
        moment: () => {},
        classList: {
          remove: () => {},
          contains: () => {},
          add: () => {}
        }
      };
    });
    chai.spy.on(mockLoginHandler, ['validateLogin'], () => {});
  })

  it('should be able to change the visibiltiy of a list of given elements', () => {
    domUpdates.changeElementsVisibility('hide', ['element1', 'element2']);
    expect(document.querySelector).to.have.been.called(2);
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
    domUpdates.displayLandingPage('customer');
    expect(document.querySelector).to.have.been.called(2);
    expect(document.querySelector).to.have.been.called.with('#log-in-form');
    expect(document.querySelector).to.have.been.called.with('#customer-landing-page');
  })

  it('should show the manager\'s login screen when their credentials are correct', () => {
    domUpdates.displayLandingPage('manager');
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

  it('should be able to populate a given user\'s booking info', () => {
    domUpdates.populateCustomerBookings();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#customer-bookings');
  })

  it('should be able to display today\'s date', () => {
    domUpdates.displayTodaysDate();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#todays-date');
  })


  it('should be able to show the number of rooms available for the day', () => {
    domUpdates.displayRoomsAvailableForDay();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#total-rooms-available');
  })

  it('should be able to show the number of rooms available for the day', () => {
    domUpdates.displayTotalRevenueForDay();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#total-revenue');
  })

  it('should be able to show the number of rooms available for the day', () => {
    domUpdates.displayOccupationPercentageForDay();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#occupation-percentage');
  })

})

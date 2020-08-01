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
      return {value: '', classList: {remove: () => {}, contains: () => {}, add: () => {}}};
    });
    chai.spy.on(mockLoginHandler, ['validateLogin'], () => {});
  })

  it('should use validate login from the loginHandler to validate credentials', () => {
    domUpdates.displayLoginResponse(mockLoginHandler);
    expect(mockLoginHandler.validateLogin).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called(5);
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

  it('should hide the login screen when the credentials are correct', () => {
    domUpdates.displayLandingPage();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with('#log-in-form');
  })
})

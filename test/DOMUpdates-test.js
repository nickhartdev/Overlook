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
      return {value: '', classList: {remove: () => {}}};
    });
    chai.spy.on(mockLoginHandler, ['validateLogin'], () => {});
  })

  it('should display an error when incorrect credentials are given', () => {
    domUpdates.displayError();
    expect(document.querySelector).to.have.been.called(3);
  })

  it('should use validateLogin from loginHandler', () => {
    domUpdates.displayLoginResponse(mockLoginHandler);
    expect(mockLoginHandler.validateLogin).to.have.been.called(1);
  })
})

import { expect } from 'chai';
import DOMUpdate from '../src/DOMUpdates.js';

describe('DOMUpdate', () => {
  let domUpdate;

  beforeEach(() => {
    domUpdate = new DOMUpdate();
  })

  it('should be a function', () => {
    expect(DOMUpdate).to.be.a('function');
  })

  it('should be an instance of DOMUpdate', () => {
    expect(domUpdate).to.be.an.instanceof(DOMUpdate);
  })
})

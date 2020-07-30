import { expect } from 'chai';
import Data from '../src/Data.js';

describe('Data', () => {
  let data, testData;

  beforeEach(() => {
    data = new Data();
  })

  it('should be a function', () => {
    expect(Data).to.be.a('function');
  })
})

// const chai = require('chai');
// const expect = chai.expect();
// const spies = require('chai-spies');
// import scripts from '../src/scripts.js';
//
// chai.use(spies);
//
// describe('scripts', () => {
//
//   beforeEach(() => {
//     global.fetch = {};
//     chai.spy.on(scripts, ['getData'], () => {});
//     chai.spy.on(fetch, ['fetch'], () => {})
//   });
//
//   afterEach(() => {
//     chai.spy.restore();
//   })
//
//   it('should fetch data', () => {
//     scripts.getData();
//     expect(fetch()).to.have.been.fired(3);
//   })
// })

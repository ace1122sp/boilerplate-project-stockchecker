const { suite, test } = require('mocha');
const chai = require('chai');
const assert = chai.assert;

const controllers = require('../controllers');

suite('controllers - unit tests', () => {
  suite('getStock()', () => {
    test('one stock', done => {
      const requiredKeys = ['name', 'label', 'price', 'likes', 'date'];
      const testLabel = 'GOOG';
        assert(controllers.getStock(testLabel), requiredKeys);
      done();
    });

    test('two stock with like = true', done => {});

    test('no query stock provided', done => {});
  });
});
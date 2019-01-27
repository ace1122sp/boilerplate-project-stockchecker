'use strict';

require('dotenv').config(); // figure out if possible to use root .env

const chai = require('chai');
const { suite, test } = require('mocha');
const { _oldPrice, _fetchNewStock, _findUpdatedStock, sanitizeAndValidateQueries, getStock, handleNoQueryStock } = require('./index');

const assert = chai.assert;

suite('controller functions', () => {
  suite('_oldPrice()', () => {
    test('old date', done => {
      const oldDate = '1000';      

      assert.isTrue(_oldPrice(oldDate));
      done();
    });

    test('date still valid', done => {
      const validDate = JSON.stringify(parseInt(Date.now()) - 1000 * 60 * 60 * 5);
      
      assert.isFalse(_oldPrice(validDate));
      done();
    });
  });

  suite('_fetchNewStock(symbol)', () => {
    test('valid usage');
  });

  suite('_findUpdatedStock(symbol, liked)', () => {
    test('');
  });

  suite('sanitizeAndValidateQueries()', () => {
    test('');
  });

  suite('getStcok()', () => {
    test('');
  });

  suite('handleNoQueryStock()', () => {
    test('');
  });

});
'use strict';

require('dotenv').config(); // figure out if possible to use root .env

const chai = require('chai');
const { suite, test } = require('mocha');
const { searchStock, getLatestPrice } = require('./api');

const assert = chai.assert;

module.exports = () => {
  suite('test server calls to stock prices api', () => {
    suite('searchStock(symbol)', () => {
      test('valid symbol provided', () => {
        // arrange 
        const symbolToTest = 'BA';
        const expected = {
          message: 'found',
          code: 200,
          data: {
            name: 'The Boeing Company',
            symbol: 'BA',
            currency: 'USD'
          }
        };

        // act 
        return searchStock(symbolToTest)
          .then(res => {
            // assert 
            assert.hasAllKeys(res, Object.keys(expected), 'keys do not match');
            assert.propertyVal(res, 'message', expected.message);
            assert.propertyVal(res, 'code', expected.code);
            assert.propertyVal(res.data, 'name', expected.data.name);
            assert.propertyVal(res.data, 'symbol', expected.data.symbol);
            assert.propertyVal(res.data, 'currency', expected.data.currency);
          });
      });
    });

    suite('getLatestPrice(symbol)', () => {
      test('valid symbol provided', () => {
        // arrange
        const symbolToTest = 'GOOG';
        const expectedKeys = ['message', 'code', 'data'];

        // act 
        return getLatestPrice(symbolToTest)
          .then(res => {
            // assert
            assert.hasAllKeys(res, expectedKeys, 'keys do not match');
            assert.propertyVal(res.data, 'symbol', symbolToTest);
            assert.property(res.data, 'price');
          });
      });
    });
  });
}
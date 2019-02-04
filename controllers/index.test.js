'use strict';

require('dotenv').config(); // figure out if possible to use root .env

const chai = require('chai');
const { suite, test, suiteTeardown } = require('mocha');
const { _oldPrice, _fetchNewStock, _findUpdatedStock, _wrapIntoArray } = require('./index');

const assert = chai.assert;

module.exports = () => {
  suite('controller functions', () => {
    // arrange global
    const expectedKeys = ['name', 'price', 'symbol', 'date', 'currency', 'likes'];

    suite('_oldPrice()', () => {
      test('old date', done => {
        // arrange
        const oldDate = '1000';

        // act 
        const actual = _oldPrice(oldDate);

        // assert
        assert.isTrue(actual);

        done();
      });

      test('date still valid', done => {
        // arrange
        const validDate = JSON.stringify(parseInt(Date.now()) - 1000 * 60 * 60 * 5);

        // act 
        const actual = _oldPrice(validDate);

        // assert
        assert.isFalse(actual);

        done();
      });
    });

    suite('_fetchNewStock(symbol)', () => {
      test('valid usage', () => {
        // arrange
        const testSymbol = 'MSFT';

        // act
        _fetchNewStock(testSymbol)
          .then(stock => {
            // assert
            assert.hasAllKeys(stock, expectedKeys, 'some keys missing');
            assert.propertyVal(stock, 'symbol', testSymbol);
          })
          .catch(() => { });
      });
    });

    suite('_findUpdatedStock(symbol, liked)', () => {
      // arrange
      const testSymbol = 'MSFT';
      const expected = {
        name: 'Microsoft Corporation',
        currency: 'USD'
      };

      // test after all to delete added stocks
      test('when stock not in db', () => {
        // act
        _findUpdatedStock(testSymbol)
          .then(stock => {
            //assert
            assert.hasAllKeys(stock, expectedKeys);
            assert.strictEqual(stock.symbol, testSymbol);
            assert.strictEqual(stock.likes, 0);
            assert.strictEqual(stock.name, expected.name);
            assert.strictEqual(stock.currency, expected.currency);
          })
          .catch(() => { });
      });
      test('when stock in db', () => {
        // arrange
        const timeBeforeTest = Date.now();

        // act
        _findUpdatedStock(testSymbol)
          .then(stock => {
            // assert
            assert.hasAllKeys(stock, expectedKeys);
            assert.strictEqual(stock.symbol, testSymbol);
            assert.strictEqual(stock.likes, 0);
            assert.strictEqual(stock.name, expected.name);
            assert.strictEqual(stock.currency, expected.currency);
            assert.isBelow(parseInt(stock.date), parseInt(timeBeforeTest));
          })
          .catch(() => { });
      });

      test('when stock in db and arg liked=true', () => {
        // act
        _findUpdatedStock(testSymbol, true)
          .then(stock => {
            // assert
            assert.hasAllKeys(stock, expectedKeys);
            assert.strictEqual(stock.symbol, testSymbol);
            assert.strictEqual(stock.likes, 1);
            assert.strictEqual(stock.name, expected.name);
            assert.strictEqual(stock.currency, expected.currency);
          })
          .catch(() => { });
      });
    });

    suite('_wrapIntoArray(arg)', () => {
      test('string', done => {
        // arrange 
        const testString = 'google';
        const expectedLength = 1;

        // act 
        const actual = _wrapIntoArray(testString);
        const actualAtZero = actual[0];

        // assert
        assert.isArray(actual);
        assert.strictEqual(actualAtZero, testString);
        assert.lengthOf(actual, expectedLength);

        done();
      });
      test('array', done => {
        // arrange 
        const testArray = ['apple', 'facebook'];
        const expectedLength = 2;

        // act
        const actual = _wrapIntoArray(testArray);

        // assert
        assert.isArray(actual);
        assert.lengthOf(actual, expectedLength);

        done();
      });
      test('undefined', done => {
        // arrange 
        const testString = undefined;
        const expectedLength = 0;

        // act
        const actual = _wrapIntoArray(testString);

        // assert
        assert.isArray(actual);
        assert.lengthOf(actual, expectedLength);

        done();
      });
    });

    suiteTeardown(() => {
      console.log('index tests finished');      
    });
  });
}
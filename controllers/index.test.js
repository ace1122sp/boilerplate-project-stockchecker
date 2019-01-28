'use strict';

require('dotenv').config(); // figure out if possible to use root .env

const chai = require('chai');
const mongoose = require('mongoose');
const { suite, test, setup, suiteSetup, teardown, suiteTeardown } = require('mocha');
const { _oldPrice, _fetchNewStock, _findUpdatedStock, _wrapIntoArray, sanitizeAndValidateQueries, getStock, handleNoQueryStock } = require('./index');
const Stock = require('../models/stock');

const assert = chai.assert;

suite('controller functions', () => {
  // test variables
  const expectedKeys = ['name', 'price', 'symbol', 'date', 'currency', 'likes'];

  // pre hook setup: connect to test-db before tests  
  suiteSetup(async () => {
    await mongoose.connect('mongodb://localhost:27017/stockpicker-test', { useNewUrlParser: true })
      .then(() => {
        console.log('connected to test db');
      })
      .catch(() => {
        console.error(err.message);
        process.exit(1);
      })
  });

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
    const testSymbol = 'MSFT';
    
    test('valid usage', () => {      
      _fetchNewStock(testSymbol)
        .then(stock => {          
          assert.hasAllKeys(stock, expectedKeys, 'some keys missing');
          assert.propertyVal(stock, 'symbol', testSymbol);
        })
        .catch(() => {});
    });
  });

  suite('_findUpdatedStock(symbol, liked)', () => {
    // expected
    const testSymbol = 'MSFT';

    // test after all to delete added stocks
    test('when stock not in db', () => {
      _findUpdatedStock(testSymbol)
        .then(stock => {
          assert.hasAllKeys(stock, expectedKeys);
          assert.strictEqual(stock.symbol, testSymbol);
          assert.strictEqual(stock.likes, 0);
          assert.strictEqual(stock.name, 'Microsoft Corporation');
          assert.strictEqual(stock.currency, 'USD');
        })
        .catch(() => {});
    });
    test('when stock in db', () => {
      // test variables
      const timeBeforeTest = Date.now();

      _findUpdatedStock(testSymbol)
        .then(stock => {
          assert.hasAllKeys(stock, expectedKeys);
          assert.strictEqual(stock.symbol, testSymbol);
          assert.strictEqual(stock.likes, 0);
          assert.strictEqual(stock.name, 'Microsoft Corporation');
          assert.strictEqual(stock.currency, 'USD');
          assert.isBelow(parseInt(stock.date), parseInt(timeBeforeTest));
        })
        .catch(() => {});
    });

    test('when stock in db and arg liked=true', () => {
      _findUpdatedStock(testSymbol, true)
        .then(stock => {
          assert.hasAllKeys(stock, expectedKeys);
          assert.strictEqual(stock.symbol, testSymbol);
          assert.strictEqual(stock.likes, 1);
          assert.strictEqual(stock.name, 'Microsoft Corporation');
          assert.strictEqual(stock.currency, 'USD');          
        })
        .catch(() => { });
    });
  });

  suite.only('_wrapIntoArray(arg)', () => {
    test('string', done => {
      // test variables 
      const testString = 'google';

      assert.isArray(_wrapIntoArray(testString));
      assert.strictEqual(_wrapIntoArray(testString)[0], testString);
      assert.lengthOf(_wrapIntoArray(testString), 1);
      done();
    });
    test('array', done => {
      // test variables 
      const testArray = ['apple', 'facebook'];

      assert.isArray(_wrapIntoArray(testArray));
      assert.lengthOf(_wrapIntoArray(testArray), 2);
      done();
    });
    test('undefined', done => {
      // test variables 
      const testString = undefined;

      assert.isArray(_wrapIntoArray(testString));
      assert.lengthOf(_wrapIntoArray(testString), 0);
      done();
    });
  });

  suite('sanitizeAndValidateQueries()', () => {
    test('');
  });

  suiteTeardown(() => {
    console.log('tests finished');
    process.exit(0);
  });
});
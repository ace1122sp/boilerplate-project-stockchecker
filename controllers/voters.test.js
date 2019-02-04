'use strict';

const chai = require('chai');
const { suite, test, suiteSetup, suiteTeardown } = require('mocha');
const mongoose = require('mongoose');
const { checkIfVotedAndSaveIfNot } = require('./voters');

const assert = chai.assert;

module.exports = () => {
  suite('handling voters functions', () => {
    // pre hook setup: connect to test-db before tests  
    suiteSetup(async () => {
      await mongoose.connect('mongodb://localhost:27017/stockpicker-test', { useNewUrlParser: true })
        .then(() => {
          console.log('connected to test db');
        })
        .catch(() => {
          console.error(err.message);
          process.exit(1);
        });
    });

    suite('checkIfVotedAndSaveIfNot(voterIp)', () => {
      test('not voted', done => {
        // arrange 
        const testIp = '211.33.32.22';
        const expected = false;

        // act
        const actual = checkIfVotedAndSaveIfNot(testIp);

        // assert
        assert.strictEqual(actual, expected);

        done();
      });
      test('already voted');
    });

    suiteTeardown(() => {
      console.log('tests finished');
    });
  });
}
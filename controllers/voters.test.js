'use strict';

const chai = require('chai');
const { suite, test, suiteSetup, suiteTeardown } = require('mocha');
const mongoose = require('mongoose');
const { checkIfVotedAndSaveIfNot } = require('./voters');

const assert = chai.assert;

module.exports = () => {
  suite('handling voters functions', () => {
    suite('checkIfVotedAndSaveIfNot(voterIp)', () => {
      // arrange
      const testIp = '211.33.32.22';

      test('not voted', () => {
        // arrange 
        const expected = false;

        // act
        return checkIfVotedAndSaveIfNot(testIp)
          .then(actual => {                      
            // assert
            console.log('actual result: ', actual);
            assert.strictEqual(actual, expected);
          });
      });
      test('already voted', () => {
        // arrange
        const expected = true;

        // act
        return checkIfVotedAndSaveIfNot(testIp)
          .then(actual => {
            console.log('actual result: ', actual);
            assert.strictEqual(actual, expected);
          });
      });
    });

    suiteTeardown(() => {
      console.log('voters tests finished');
    });
  });
}
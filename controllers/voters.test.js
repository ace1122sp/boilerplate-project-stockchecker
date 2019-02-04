'use strict';

const chai = require('chai');
const { suite, test, suiteTeardown } = require('mocha');
const { checkIfVotedAndSaveIfNot } = require('./voters');
const Voter = require('../models/voter');

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
            assert.strictEqual(actual, expected);
          });
      });
      test('already voted', () => {
        // arrange
        const expected = true;

        // act
        return checkIfVotedAndSaveIfNot(testIp)
          .then(actual => {
            assert.strictEqual(actual, expected);
          });
      });      
    });
    
    suiteTeardown(() => {   
      console.log('voters tests executed');
    });
  });
}
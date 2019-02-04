'use strict';

const chai = require('chai');
const { suite, test } = require('mocha');
const mongoose = require('mongoose');
const { add, get } = require('./voters');

const assert = chai.assert;

module.exports = () => {
  suite('handling voters', () => {
    suite('add()', () => {
      test('new voter');
      test('existing voter');
    });

    suite('get()', () => {
      test('existing voter');
      test('non existing voter');
    });
  });
}
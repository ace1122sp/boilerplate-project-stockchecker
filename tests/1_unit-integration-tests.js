/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const mongoose = require('mongoose');
const { suite, suiteSetup, suiteTeardown } = require('mocha');
const config = require('../config');
const errorHandler = config.app.env === 'PRODUCTION' ? require('../libs/prodErrorHandler') : require('../libs/devErrorHandler');
const apiUnitTests = require('../controllers/api.test');
const controllersUnitTests = require('../controllers/index.test');

suite.skip('Unit Tests', function(){
  suiteSetup(async () => {
    await mongoose.connect('mongodb://localhost:27017/stockpicker-test', { useNewUrlParser: true })
      .then(() => {
        console.log('connected to test db');
      })
      .catch(err => {
        errorHandler.handleTest(err);
      });
  });

  apiUnitTests();
  controllersUnitTests();

  suiteTeardown(() => {
    console.log('all unit tests executed');
  });
});
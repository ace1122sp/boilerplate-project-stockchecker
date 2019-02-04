/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const { suite } = require('mocha');
const apiUnitTests = require('../controllers/api.test');
const votersUnitTests = require('../controllers/voters.test.js');
const controllersUnitTests = require('../controllers/index.test');

suite('Unit Tests', function(){
  apiUnitTests();
  votersUnitTests();
  controllersUnitTests();
});
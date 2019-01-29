/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const { sanitizeAndValidateQueries, getStock, handleNoQueryStock } = require('../controllers');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(sanitizeAndValidateQueries, getStock, handleNoQueryStock);    
};

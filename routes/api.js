/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const { getStock } = require('../controllers');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(getStock);    
};

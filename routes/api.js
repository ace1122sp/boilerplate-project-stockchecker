/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const { sanitizeAndValidateQueries, setLikePermission, getStock, handleNoQueryStock } = require('../controllers');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(sanitizeAndValidateQueries, setLikePermission, getStock, handleNoQueryStock);    
};

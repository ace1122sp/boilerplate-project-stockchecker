/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const { extractIp, sanitizeAndValidateQueries, setLikePermission, getStock, handleNoQueryStock } = require('../controllers');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(extractIp, sanitizeAndValidateQueries, setLikePermission, getStock, handleNoQueryStock);    
};

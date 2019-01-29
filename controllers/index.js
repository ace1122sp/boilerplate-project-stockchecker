const { sanitizeQuery } = require('express-validator/filter');
const { query, validationResult } = require('express-validator/check');

const Stock = require('../models/stock');
const { getLatestPrice, searchStock } = require('./api');

const _oldPrice = date => {
  const maxAge = 1000 * 60 * 60 * 24;
  const activeDate = parseInt(date);
  const now = Date.now();

  const currentAge = now - activeDate;
  const isOld = currentAge > maxAge ? true : false;
  return isOld;
}

// _ to return promises
// returns Stock instance which does not exist in db yet
const _fetchNewStock = symbol => {
  return searchStock(symbol)
    .then(data => {
      let stock = new Stock(data.data);
      return stock        
    })
    .catch(err => {
      // to handle
    });
}
const _findUpdatedStock = (symbol, liked = false) => {    
    return Stock.findOne({ symbol })
      .then(stock => {
        if (!stock) return _fetchNewStock(symbol)
        return stock;
      })
      .then(stock => {        
        if (_oldPrice(stock.date)) {
          return getLatestPrice(stock.symbol)
            .then(res => {
              return stock.updatePrice(parseFloat(res.data.price))
            })            
            .catch(err => {
              throw err;
            });          
        } else {
          return stock;
        }
      })
      .then(stock => {
        if (liked) stock.increaseLikes();
        return stock;
      })
      .then(stock => {        
        return stock.save()
      })
      .catch(err => {
        // to handle
      });
}

const _wrapIntoArray = arg => {
  let queries = [];
  
  if (!arg) return [];
  if (typeof arg === 'string') {
    queries.push(arg);
  } else {
    queries = [arg[0], arg[1]];
  }

  return queries;
}

const sanitizeAndValidateQueries = [
  sanitizeQuery('stock')
    .trim()
    .escape(),
  sanitizeQuery('like')
    .toBoolean()
];

const getStock = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  req.query.stock = _wrapIntoArray(req.query.stock);  
  
  if (!req.query.stock.length) return next(); 

  res.locals.stocks = [];
  req.query.stock.forEach(symbol => {    
    res.locals.stocks.push(_findUpdatedStock(symbol));    
  });  
  
  Promise.all(res.locals.stocks)  
    .then(stocks => {
      console.log(stocks);
      console.log(typeof stocks[0]);
      res.json({ stockData: [...stocks] })
    })
    .catch(err => {
      next(err);
    });
}

const handleNoQueryStock = (req, res) => {  
  res.sendStatus(400);
}

module.exports = {
  _oldPrice,
  _fetchNewStock,
  _findUpdatedStock,
  _wrapIntoArray,
  sanitizeAndValidateQueries,
  getStock,
  handleNoQueryStock
}
const { sanitizeQuery } = require('express-validator/filter');
const { validationResult } = require('express-validator/check');

const Stock = require('../models/stock');
const { getLatestPrice, searchStock } = require('./api');
const { checkIfVotedAndSaveIfNot } = require('./voters');

const _oldPrice = date => {
  const maxAge = 1000 * 60 * 60 * 24;
  const activeDate = parseInt(date);
  const now = Date.now();

  const currentAge = now - activeDate;
  const isOld = currentAge > maxAge ? true : false;
  return isOld;
}

// returns Stock instance which does not exist in db yet
const _fetchNewStock = symbol => {
  return searchStock(symbol)
    .then(data => {      
      return Stock.findOne({ symbol: data.data.symbol })
        .then(stock => {
          if (!stock) return new Stock(data.data);
          return stock;
        });
    })
    .catch(err => {
      // to handle
    });
}
const _findUpdatedStock = (symbol, voterIp, liked = false) => {    
    return Stock.findOne({ symbol })
      .then(stock => {        
        if (!stock) return _fetchNewStock(symbol);      
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
        if (!liked) return stock;
        return checkIfVotedAndSaveIfNot(voterIp)
          .then(voted => {
            if (voted) return stock;
            return stock.increaseLikes();
          })
          .catch(err => {}) // to handle;
      })
      .then(stock => {
        return stock.save();
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
    res.locals.stocks.push(_findUpdatedStock(symbol, req.ip, req.query.like));    
  });  
  
  Promise.all(res.locals.stocks)  
    .then(stocks => {
      let cleanedStocks = stocks.map(stock => {
        if (!stock) return { message: 'not found', code: 404 };

        return {
          name: stock.name,
          symbol: stock.symbol,
          price: stock.price,
          currency: stock.currency,
          likes: stock.likes,
          date: stock.date
        };
      });
      res.json({ stockData: [...cleanedStocks] });
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
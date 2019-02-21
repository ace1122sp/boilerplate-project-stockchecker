const { sanitizeQuery } = require('express-validator/filter');
const { validationResult } = require('express-validator/check');

const Stock = require('../models/stock');
const { getLatestPrice, searchStock } = require('./api');
const { checkIfVoted, addVoter } = require('./voters');
const { wrapIntoArray, oldPrice } = require('./helpers');

// extract ip
const extractIp = (req, res, next) => {
  const regexLanguageAndIPAddress = /.*?(?=,)/;

  const ipAddress = JSON.stringify(regexLanguageAndIPAddress.exec(req.headers['x-forwarded-for'])).slice(2, -2);
  res.locals.ip = ipAddress;
  next();
}

// returns Stock instance which does not exist in db yet
const _fetchNewStock = symbol => {
  return searchStock(symbol)
    .then(data => {     
      if (data.code === 404) return data
      return Stock.findOne({ symbol: data.data.symbol })
        .then(stock => {
          if (!stock) return new Stock(data.data);
          return stock;
        });
    })
    .catch(err => {
      throw err;
    });
}
const _findUpdatedStock = (symbol, shouldLike = false) => {    
    return Stock.findOne({ symbol })
      .then(stock => {        
        if (!stock) {
          return _fetchNewStock(symbol);
        } else {
          return stock;
        }
      })
      .then(stock => {   
        if (oldPrice(stock.date)) {
          return getLatestPrice(stock.symbol)
            .then(res => {
              if (res.code === 404) return res;
              return stock.updatePrice(parseFloat(res.data.price));
            })          
        } else {
          return stock;
        }
      })
      .then(stock => {
        if (shouldLike && stock.code !== 404) stock.increaseLikes();
        return stock;
      })
      .then(stock => {        
        if (stock.code === 404) return stock;
        return stock.save();
      })
      .catch(err => {
        throw err;
      });
}

const sanitizeAndValidateQueries = [
  sanitizeQuery('stock')
    .trim()
    .escape(),
  sanitizeQuery('like')
    .toBoolean()
];

const setLikePermission = (req, res, next) => {
  if (!req.query.like) {
    res.locals.shouldLike = false;
    next();
  } else {
    let ip = res.locals.ip || req.ip;
    checkIfVoted(ip)
      .then(voted => {
        res.locals.shouldLike = !voted;
        next();
      })
      .catch(err => {
        throw err;
      });
  }
}

const getStock = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  req.query.stock = wrapIntoArray(req.query.stock);  
  
  if (!req.query.stock.length) return next(); 

  shouldLike = res.locals.shouldLike;

  let ip = res.locals.ip || req.ip;
  res.locals.stocks = [];
  req.query.stock.forEach(symbol => {    
    res.locals.stocks.push(_findUpdatedStock(symbol, shouldLike));    
  });  
  
  Promise.all(res.locals.stocks)  
    .then(stocks => {
      let cleanedStocks = stocks.map(stock => {
        if (!stock.symbol) return { message: 'not found', code: 404 };

        return {
          name: stock.name,
          symbol: stock.symbol,
          price: stock.price,
          currency: stock.currency,
          likes: stock.likes,
          date: stock.date
        };
      });
      
      if (shouldLike) {
        addVoter(ip)
          .then(() => {
            res.json({ stockData: [...cleanedStocks] });
          })
          .catch(err => {
            next(err);
          });
      } else {
        res.json({ stockData: [...cleanedStocks] });
      }
    })
    .catch(err => {
      next(err);
    });
}

const handleNoQueryStock = (req, res) => {  
  res.sendStatus(400);
}

module.exports = {  
  _fetchNewStock,
  _findUpdatedStock,
  sanitizeAndValidateQueries,
  extractIp,
  setLikePermission,
  getStock,
  handleNoQueryStock
}
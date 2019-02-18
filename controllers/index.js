const { sanitizeQuery } = require('express-validator/filter');
const { validationResult } = require('express-validator/check');

const Stock = require('../models/stock');
const { getLatestPrice, searchStock } = require('./api');
const { checkIfVoted, addVoter } = require('./voters');
const { wrapIntoArray, oldPrice } = require('./helpers');

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
const _findUpdatedStock = (symbol, voterIp, liked = false) => {    
    return Stock.findOne({ symbol })
      .then(stock => {        
        if (!stock) return _fetchNewStock(symbol);      
        return stock;
      })
      .then(stock => {   
        if (oldPrice(stock.date)) {
          return getLatestPrice(stock.symbol)
            .then(res => {
              return stock.updatePrice(parseFloat(res.data.price))
            })          
        } else {
          return stock;
        }
      })
      .then(stock => {
        if (!liked || stock.code === 404) return stock;
        return checkIfVoted(voterIp)
          .then(voted => {
            if (voted) return stock;
            stock.increaseLikes();
            return stock;
          })
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

const getStock = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  req.query.stock = wrapIntoArray(req.query.stock);  
  
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

      if (req.query.like) {
        addVoter(req.ip)
          .then(() => {
            res.json({ stockData: [...cleanedStocks] });
          })
          .catch(err => {
            console.log(err);
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
  getStock,
  handleNoQueryStock
}
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

const sanitizeAndValidateQueries = (req, res, next) => {
  // additionally it formats stock queries in an array

  // pseudo
  let queries = [];
  if (typeof req.query.stock === 'string') {
    queries.push(req.query.stock);
  } else {
    queries = [req.query.stock[0], req.query.stock[1]];
  }
  req.query.stock = [...queries];
  next();
}

const getStock = async (req, res, next) => {
  if (!req.query.stock.length) next(); 
  res.locals.stocks = [];
  req.query.stock.forEach(symbol => {    
    res.locals.stocks.push(_findUpdatedStock(symbol));
  });
  Promise.all(res.locals.stocks)
    .then(stocks => {
      res.json({ stockData: [...stocks] })
    })
    .catch(err => {
      next(err);
    });
}

const handleNoQueryStock = (req, res) => {}

module.exports = {
  _oldPrice,
  _fetchNewStock,
  _findUpdatedStock,
  sanitizeAndValidateQueries,
  getStock,
  handleNoQueryStock
}
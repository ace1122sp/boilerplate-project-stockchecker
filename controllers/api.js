const axios = require('axios');
const errorHandler = process.env.NODE_ENV === 'PRODUCTION' ? require('../libs/prodErrorHandler') : require('../libs/devErrorHandler');

// set default timeout
axios.defaults.timeout = 5000;

const searchStock = symbol => {
  const url = `${process.env.STOCK_API_BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.STOCK_API_KEY}`;
  
  return axios(url)
    .then(res => res.data.bestMatches[0] || null)
    .then(stock => {
      console.log(stock);
      if (!stock['1. symbol']) return { message: 'not found', code: 404 };
      return { 
        message: 'found', 
        code: 200, 
        data: { 
          name: stock['2. name'],
          symbol: stock['1. symbol'],
          currency: stock['8. currency']
        } 
      }
    })
    .catch(err => {
      return errorHandler.handleApi(err);
    });
};

const getLatestPrice = symbol => {
  const url = `${process.env.STOCK_API_BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`;  

  return axios(url)
    .then(res => res.data['Global Quote'] || null)
    .then(stock => {
      console.log(stock);
      if (!stock['1. symbol']) return { message: 'not found', code: 404 };
      return {
        message: 'found',
        code: 200,
        data: {
          symbol: stock['01. symbol'],
          price: stock['05. price']
        }
      }
    })    
    .catch(err => {
      return errorHandler.handleApi(err);
    });
};

module.exports = {
  getLatestPrice,
  searchStock
};
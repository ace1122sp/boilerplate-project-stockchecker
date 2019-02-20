const axios = require('axios');
const errorHandler = process.env.NODE_ENV === 'PRODUCTION' ? require('../libs/prodErrorHandler') : require('../libs/devErrorHandler');

// set default timeout
axios.defaults.timeout = 15000;

const searchStock = symbol => {
  const url = `${process.env.STOCK_API_BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.STOCK_API_KEY}`;
  
  return axios(url)
    .then(res => {
      if (res.data['Note']) {
        throw new Error('api overflow');
      }
      return res.data.bestMatches[0] || null;
    })
    .then(stock => {
      let apiResponse;
      if (!stock) {
        apiResponse = { message: 'not found', code: 404 };
      } else {
        apiResponse = { 
          message: 'found', 
          code: 200, 
          data: { 
            name: stock['2. name'],
            symbol: stock['1. symbol'],
            currency: stock['8. currency']
          } 
        };
      }

      return apiResponse;
    })
    .catch(err => {
      return errorHandler.handleApi(err);
    });
};

const getLatestPrice = symbol => {
  const url = `${process.env.STOCK_API_BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`;  
  return axios(url)
    .then(res => {
      if (res.data['Note']) {
        throw new Error('api overflow');
      }
      
      return res.data['Global Quote'] || null;
    })
    .then(stock => {
      let apiResponse;
      if (!stock) {
        apiResponse = { message: 'not found', code: 404 };
      } else {
        apiResponse = {
          message: 'found',
          code: 200,
          data: {
            symbol: stock['01. symbol'],
            price: stock['05. price']
          }
        }
      }
      
      return apiResponse;
    })    
    .catch(err => {
      return errorHandler.handleApi(err);
    });
};

module.exports = {
  getLatestPrice,
  searchStock
};
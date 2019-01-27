const axios = require('axios');

const searchStock = symbol => {
  const url = `${process.env.STOCK_API_BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.STOCK_API_KEY}`;
  
  return axios(url)
    .then(res => res.data.bestMatches[0] || null)
    .then(stock => {
      if (!stock) return { message: 'not found', status: 'na' };
      return { 
        message: 'found', 
        status: 'ok', 
        data: { 
          name: stock['2. name'],
          symbol: stock['1. symbol'],
          currency: stock['8. currency']
        } 
      }
    })
    .catch(err => {
      return { message: err.message, status: 'error' }
    });
}

const getLatestPrice = symbol => {
  const url = `${process.env.STOCK_API_BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`;  

  return axios(url)
    .then(res => res.data['Global Quote'] || null)
    .then(stock => {
      if (!stock) return { message: 'not found', status: 'na' };
      return {
        message: 'found',
        status: 'ok',
        data: {
          symbol: stock['01. symbol'],
          price: stock['05. price']
        }
      }
    })
    .catch(err => {
      return { message: err.message, status: 'error' }
    });
}

module.exports = {
  getLatestPrice,
  searchStock
}
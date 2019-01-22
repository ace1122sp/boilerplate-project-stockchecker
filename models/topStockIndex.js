const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TopStocksIndexSchema = new Schema({
  topStocks: {
    type: [Schema.Types.ObjectId],
    ref: 'Stock',
    min: 0,
    max: 10,
    default: [],
  },
  lastUpdated: {
    type: String,
    default: new Date()
  }
});

const TopStocksIndex = mongoose.model('TopStocksIndex', TopStocksIndexSchema);

module.exports = TopStocksIndex;
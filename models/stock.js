const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const StockSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 20
  },
  label: {
    type: String,
    required: true,
    min: 1,
    max: 7
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  price: {
    type: Number,
    min: 0
  },
  date: {
    type: String,
    default: new Date()
  }
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;
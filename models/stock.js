const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const StockSchema = new mongoose.Schema({
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

StockSchema.method({
  updatePrice: function(price) {
    this.price = price;
    this.date = Date.now();
    return this;
  },
  increaseLikes: function() {
    this.likes += 1;
    return this;
  }
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;
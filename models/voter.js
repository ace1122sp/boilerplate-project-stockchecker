const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const VoterSchema = new Schema({
  voter: {
    type: String,
    default: 'voter',
    min: 5,
    max: 5
  },
  _id: {
    type: String,
    required: true
  }
});

const Voter = mongoose.model('Voter', VoterSchema);

module.exports = Voter;
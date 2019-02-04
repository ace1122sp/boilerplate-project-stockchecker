const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const VoterSchema = new mongoose.Schema({
  voter: {
    type: String,
    required: true,
    min: 5,
    max: 5
  }
});

const Voter = mongoose.model('Voter', VoterSchema);

module.exports = Voter;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const VoterSchema = new mongoose.Schema({
  voterIp: {
    type: String,
    required: true
  }
});

const Voter = mongoose.model('Voter', VoterSchema);

module.exports = Voter;
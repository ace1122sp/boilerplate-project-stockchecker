const Voter = require('../models/voter');

const checkIfVotedAndSaveIfNot = voterIp =>
  Voter.findOne({ voterIp })
    .then(res => {
      if (res) return true;
      let voter = new Voter({ voterIp });
      return voter.save()
        .then(res => false)
        .catch(err => {}); // to handle
    })
    .then(res => {
      if (res) return true;
      return false;
    })
    .catch(err => {
      console.log(err);
    }) // to handle

module.exports = {
  checkIfVotedAndSaveIfNot
};
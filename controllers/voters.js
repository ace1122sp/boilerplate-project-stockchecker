const Voter = require('../models/voter');

const checkIfVoted = voterIp =>
  Voter.findOne({ voterIp })
    .then(res => {
      if (res) return true;
      return false      
    })
    .catch(err => {}); // to handle

const addVoter = voterIp => 
  Voter.findOne({ voterIp })
    .then(res => {
      if (!res) {
        let voter = new Voter({ voterIp });
        voter.save()
          .then(() => {
            return;
          })
          .catch(err => {}) // to handle
      }
    });

module.exports = {
  checkIfVoted,
  addVoter
};
const Voter = require('../models/voter');
const errorHandler = process.env.NODE_env == 'PRODUCTION' ? require('../libs/prodErrorHandler') : require('../libs/devErrorHandler');

const checkIfVoted = voterIp =>
  Voter.findOne({ voterIp })
    .then(res => {
      if (res) return true;
      return false      
    })
    .catch(err => {
      errorHandler.handleVoters(err);
    });

const addVoter = voterIp => 
  Voter.findOne({ voterIp })
    .then(res => {
      if (!res) {
        let voter = new Voter({ voterIp });
        voter.save()
          .then(() => {
            return;
          })
          .catch(err => {
            errorHandler.handleVoters(err);
          });
      }
    });

module.exports = {
  checkIfVoted,
  addVoter
};
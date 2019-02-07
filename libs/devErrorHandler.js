module.exports = (() => {
  const _handle = err => {
    console.log(error);
    process.exit(1);
  };

  const handleTest = err => {
    console.log(err);
  };

  const handleApi = err => {
    console.error(err);
    return { message: err.message, status: 'error' };
  };

  const logErrors = (err, req, res, next) => {
    console.error(err);
    next(err);
  };

  const handleClientResponse = (err, req, res, next) => {
    res.sendStatus(500);      
  };

  const handleVoters = _handle;

  return {
    handleTest,
    handleApi,
    handleVoters,
    logErrors, 
    handleClientResponse 
  }
})();
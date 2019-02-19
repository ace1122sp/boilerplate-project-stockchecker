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
    if (err.message === 'Cannot read property \'0\' of undefined') return { message: 'Bad user input', code: 404 };
    return { message: err.message, code: 500 };
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
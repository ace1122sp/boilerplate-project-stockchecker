module.exports = (() => {
  const _handle = err => {
    throw err;
  }

  const handleTest = err => {
    console.log('Error ---');
  };

  const handleApi = err => {
    return { message: 'server error', status: 'error' };
  };

  const handleVoters = _handle;

  const logErrors = (err, req, res, next) => {
    console.log('error: ', err.message);
    next(err);
  };

  const handleClientResponse = (err, req, res, next) => {
    res.sendStatus(500);
  }

  return {
    handleTest,
    handleApi,
    handleVoters,
    logErrors, 
    handleClientResponse
  }
})();
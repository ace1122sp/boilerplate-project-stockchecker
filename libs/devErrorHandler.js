module.exports = (() => {
  const handle = err => {
    console.log(error);
    process.exit(1);
  };

  const handleTest = err => {
    console.log(err);
  }

  return {
    handle, 
    handleTest
  }
})();
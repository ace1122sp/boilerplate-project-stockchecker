const wrapIntoArray = arg => {
  let queries = [];
  
  if (!arg) return [];
  if (typeof arg === 'string') {
    queries.push(arg);
  } else {
    queries = [arg[0], arg[1]];
  }

  return queries;
}

const oldPrice = date => {
  const maxAge = 1000 * 60 * 60 * 24;
  const activeDate = parseInt(date);
  const now = Date.now();

  const currentAge = now - activeDate;
  const isOld = currentAge > maxAge ? true : false;
  return isOld;
}

module.exports = {
  wrapIntoArray, 
  oldPrice
};
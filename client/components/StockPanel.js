import React from 'react';

const StockPanel = stock => {
  return (
    <div>
      <h2>{stock.symbol}</h2>
      <p>{stock.name}</p>
      <p>{stock.price}</p>
      <p>{stock.likes}</p>
      <label>likes</label>
    </div>
  );
}

export default StockPanel;
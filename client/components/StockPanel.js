import React from 'react';

const Panel = ({ stock }) => 
  <div>
    <h2>{stock.symbol}</h2>
    <p>{stock.name}</p>
    <p>{stock.price}</p>
    <p>{stock.likes}</p>
    <label>likes</label>
  </div>

const StockPanel = ({ stocks, changeActiveComponent }) => {
  const cancel = () => {
    changeActiveComponent();
  }

  const panels = stocks.map((stock, i) => <Panel key={i} stock={stock} />);
  return (
    <div>
      <button onClick={cancel}>x</button>
      {panels} 
    </div>
  );
}

export default StockPanel;
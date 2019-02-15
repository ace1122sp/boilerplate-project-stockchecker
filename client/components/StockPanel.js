import React from 'react';

const Panel = ({ stock }) => 
  <div className='div-stock'>
    <h2>{stock.symbol}</h2>
    <p>{stock.name}</p>
    <p>{stock.currency} {stock.price}</p>
    <p>{stock.likes}</p>
    {typeof stock.likes === 'number' && <label>likes</label>}
  </div>

const StockPanel = ({ stocks, changeActiveComponent }) => {
  const cancel = () => {
    changeActiveComponent();
  }

  const modifiedStocks = [...stocks];
  const shouldLikesBeRelative =  modifiedStocks.length === 2 && typeof modifiedStocks[1].likes === 'number';

  if (shouldLikesBeRelative) {
    modifiedStocks[0].likes = modifiedStocks[0].likes - modifiedStocks[1].likes;
    modifiedStocks[1].likes = (-1) * modifiedStocks[0].likes;
  }

  const panels = modifiedStocks.map((stock, i) => <Panel key={i} stock={stock} />);

  return (
    <div className='wrapper-with-close'>
      <button onClick={cancel} className='close-btn'>x</button>
      <div className='stock-wrapper'>
        {panels} 
      </div>
    </div>
  );
}

export default StockPanel;
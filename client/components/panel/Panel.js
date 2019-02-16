import React from 'react';

const Panel = ({ stock }) => 
  <div className='div-stock'>
    <h2>{stock.symbol}</h2>
    <p>{stock.name}</p>
    <p>{stock.currency} {stock.price}</p>
    <p>{stock.likes}</p>
    {typeof stock.likes === 'number' && <label>likes</label>}
  </div>

export default Panel;
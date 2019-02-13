import React, { useState } from 'react';
import { apiUrl } from '../urls';
import { STOCK_PANEL, NOT_FOUND_PANEL } from './constants';

const StockForm = ({ changeActiveComponent, updateStocks }) => {
  const [loading, setLoadingStatus] = useState(false);

  const cancel = () => {
    changeActiveComponent();
  };

  const handleRequest = e => {
    e.preventDefault();
    setLoadingStatus(true);
    const unsafeStock = e.target.stock.value;
    const like = e.target.like.checked;
    let url = apiUrl + `stock=${unsafeStock}`;

    if (like) url += `&like=${like}`;
    fetch(url)
      .then(res => {
        if (!res) return null;
        return res.json();
      })
      .then(res => {
        setLoadingStatus(false);        
        updateStocks([res.stockData[0]]);

        const panelToRender = res.stockData[0].symbol ? STOCK_PANEL : NOT_FOUND_PANEL;

        changeActiveComponent(panelToRender);          
      })
      .catch(err => {}); // to handle
  };

  const loadingSpan = <span>loading...</span>;

  return (
    <div>
      {loading && loadingSpan}
      <button onClick={cancel}>x</button>
      <form onSubmit={handleRequest}>
        <input type='text' placeholder='stock' autoFocus required name='stock' id='stock-input' />
        <input type='checkbox' name='like' id='like-input'/>
        <label htmlFor='like-input'>like</label>
        <button>get price</button>
      </form>
    </div>
  );
}

export default StockForm;
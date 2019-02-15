import React, { useState } from 'react';
import { apiUrl } from '../urls';
import { STOCK_PANEL, NOT_FOUND_PANEL, ERROR_PANEL } from './constants';

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
      .catch(err => {
        changeActiveComponent(ERROR_PANEL);
      });
  };

  const loadingSpan = <span>loading...</span>;

  return (
    <div className='wrapper-with-close'>
      {loading && loadingSpan}
      <button onClick={cancel} className='close-btn'>x</button>
      <form onSubmit={handleRequest} className='form'>
        <input type='text' placeholder='stock' autoFocus required name='stock' id='stock-input' />
        <br />
        <input type='checkbox' name='like' id='like-input'/>
        <label htmlFor='like-input'>like</label>
        <br />
        <button className='action-btn'>get price</button>
      </form>
    </div>
  );
}

export default StockForm;
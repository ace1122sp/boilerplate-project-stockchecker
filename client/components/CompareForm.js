import React, { useState } from 'react';
import { apiUrl } from '../urls';
import { STOCK_PANEL, NOT_FOUND_PANEL } from './constants';


const CompareForm = ({ changeActiveComponent, updateStocks }) => {
  const [loading, setLoadingStatus] = useState(false);

  const cancel = () => {
    changeActiveComponent();
  };

  const handleRequest = e => {
    e.preventDefault();
    setLoadingStatus(true);    
    const unsafeStocks = [e.target.stockA.value, e.target.stockB.value];
    const like = e.target.like.checked;
    let url = apiUrl + `stock=${unsafeStocks[0]}&stock=${unsafeStocks[1]}`;

    if (like) url +=`&like=${like}`;

    fetch(url) 
      .then(res => {
        if (!res) return null;
        return res.json();
      })
      .then(res => {
        setLoadingStatus(false);
        updateStocks([...res.stockData]);

        const panelToRender = res.stockData[0].symbol ? STOCK_PANEL : NOT_FOUND_PANEL;
        changeActiveComponent(panelToRender);
      })
      .catch(err => {}); // to handle
  }

  const loadingSpan = <span>loading...</span>

  return (
    <div>
      {loading && loadingSpan}
      <button onClick={cancel}>x</button>
      <form onSubmit={handleRequest}>
        <input type='text' placeholder='stock a' autoFocus required name='stockA' id='stock-input-a' />
        <input type='text' placeholder='stock b' required name='stockB' id='stock-input-b' />
        <input type='checkbox' name='like' id='like-input' />
        <label htmlFor='like-input'>like both</label>
        <br />
        <button>compare</button>
      </form>
    </div>
  );
}

export default CompareForm;
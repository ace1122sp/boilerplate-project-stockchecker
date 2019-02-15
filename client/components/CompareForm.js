import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      .catch(err => {
        changeActiveComponent(ERROR_PANEL);
      });
  }

  const handleLike = () => {}

  const loadingSpan = <span>loading...</span>

  return (
    <div className='wrapper-with-close'>
      {loading && loadingSpan}
      <button onClick={cancel} className='close-btn'>x</button>
      <form onSubmit={handleRequest} className='form'>
        <input type='text' placeholder='stock a' autoFocus required name='stockA' id='stock-input-a' />
        <br />
        <input type='text' placeholder='stock b' required name='stockB' id='stock-input-b' />
        <br />
        <input type='checkbox' name='like' id='like-input' className='checkbox' onChange={handleLike} />
        <label htmlFor='like-input' id='like-label'><FontAwesomeIcon icon='thumbs-up' className='not-liked'/></label>
        <br />
        <br />
        <button className='action-btn'>compare</button>
      </form>
    </div>
  );
}

export default CompareForm;
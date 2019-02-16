import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { apiUrl } from '../urls';
import { STOCK_PANEL, NOT_FOUND_PANEL, ERROR_PANEL } from './constants';

const StockForm = props => {
  const handleRequest = e => {
    e.preventDefault();
    props.setLoadingStatus(true);
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
        props.setLoadingStatus(false);        
        props.updateStocks([res.stockData[0]]);

        const panelToRender = res.stockData[0].symbol ? STOCK_PANEL : NOT_FOUND_PANEL;

        props.changeActiveComponent(panelToRender);          
      })
      .catch(err => {
        props.changeActiveComponent(ERROR_PANEL);
      });
  };

  return (
    <form onSubmit={handleRequest} className='form'>
      <input type='text' placeholder='stock' autoFocus required name='stock' id='stock-input' />
      <input type='checkbox' name='like' id='like-input' className='checkbox' onChange={props.handleLike} />
      <label htmlFor='like-input' id='like-label'><FontAwesomeIcon icon='thumbs-up' className={props.likeClassName} /></label>
      <br />
      <br />
      <button className='action-btn'>get price</button>
    </form>
  );
}

export default StockForm;
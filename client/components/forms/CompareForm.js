import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { apiUrl } from '../../urls';
import { STOCK_PANEL, NOT_FOUND_PANEL, ERROR_PANEL } from '../constants';

const CompareForm = props => {
  const handleRequest = e => {
    e.preventDefault();
    props.setLoadingStatus(true);    
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
        props.setLoadingStatus(false);
        props.updateStocks([...res.stockData]);

        const panelToRender = res.stockData[0].symbol && res.stockData[1].symbol ? STOCK_PANEL : NOT_FOUND_PANEL;
        props.changeActiveComponent(panelToRender);
      })
      .catch(err => {
        props.changeActiveComponent(ERROR_PANEL);
      });
  }

  return (
    <form onSubmit={handleRequest} className='form'>
      <input type='text' placeholder='stock a' autoFocus required name='stockA' id='stock-input-a' />
      <br />
      <input type='text' placeholder='stock b' required name='stockB' id='stock-input-b' />
      <br />
      <input type='checkbox' name='like' id='like-input' className='checkbox' onChange={props.handleLike} />
      <label htmlFor='like-input' id='like-label'><FontAwesomeIcon icon='thumbs-up' className={props.likeClassName} /></label>
      <br />
      <br />
      <button className='action-btn'>compare</button>
    </form>
  );
}

export default CompareForm;
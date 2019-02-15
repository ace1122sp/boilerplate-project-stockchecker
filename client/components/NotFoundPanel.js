import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/NotFoundPanel.scss';

const NotFoundPanel = ({ changeActiveComponent, updateStocks }) => {
  const cancel = () => {
    changeActiveComponent();
    updateStocks(null);
  }

  return (
    <div className='wrapper-with-close'>
      <button onClick={cancel} className='close-btn'>x</button>
      <h2>Stock Not Found</h2>
      <FontAwesomeIcon icon='eye-slash' size='2x' />  
    </div>
  );
}

export default NotFoundPanel;
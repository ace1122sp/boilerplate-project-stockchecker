import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/NotFoundPanel.scss';

const ErrorPanel = ({ changeActiveComponent }) => {
  const cancel = () => {
    changeActiveComponent();
  }

  return (
    <div className='wrapper-with-close'>
      <button onClick={cancel} className='close-btn'>x</button>
      <h2>Snap... We've made too many requests to our free API!</h2>
      <FontAwesomeIcon icon='house-damage' size='2x' />  
    </div>
  );
}

export default ErrorPanel;
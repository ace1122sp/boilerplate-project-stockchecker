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
      <h2>Snap... Something went wrong!</h2>
      <FontAwesomeIcon icon='eye-slash' size='2x' />  
    </div>
  );
}

export default ErrorPanel;
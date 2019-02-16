import React from 'react';
import { STOCK_FORM, COMPARE_FORM } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/FormSelector.scss';

const FormSelector = ({ changeActiveComponent }) => {
  const getStockForm = () => {
    changeActiveComponent(STOCK_FORM);
  };

  const getCompareForm = () => {
    changeActiveComponent(COMPARE_FORM);
  };

  return (
    <div className='div-wrapper'>
      <button onClick={getStockForm} className='panel form-selector fade-away'><FontAwesomeIcon icon="chart-line" size="4x" /> <span>find your stock</span></button>
      <button onClick={getCompareForm} className='panel form-selector fade-away'><FontAwesomeIcon icon="balance-scale" size="4x" /> <span>compare two stocks</span></button>
    </div>
  );
}

export default FormSelector;
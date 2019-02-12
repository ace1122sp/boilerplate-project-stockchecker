import React from 'react';
import { STOCK_FORM, COMPARE_FORM } from './constants';

const FormSelector = ({ changeActiveComponent }) => {
  const getStockForm = () => {
    changeActiveComponent(STOCK_FORM);
  };

  const getCompareForm = () => {
    changeActiveComponent(COMPARE_FORM);
  };

  return (
    <div>
      <button onClick={getStockForm}>find your stock</button>
      <button onClick={getCompareForm}>compare two stocks</button>
    </div>
  );
}

export default FormSelector;
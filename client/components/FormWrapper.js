import React, { useState } from 'react';

import StockForm from './StockForm';
import CompareForm from './CompareForm';
import { STOCK_FORM, COMPARE_FORM } from './constants';
import LoadingPanel from './LoadingPanel';

const FormWrapper = ({ changeActiveComponent, updateStocks, componentToRender }) => {
  const [loading, setLoadingStatus] = useState(false);
  const [likeClassName, toggleClass] = useState('not-liked');

  const cancel = () => {
    changeActiveComponent();
  };

  const handleLike = () => {
    const classToSet = likeClassName === 'not-liked' ? 'liked' : 'not-liked';
    toggleClass(classToSet);
  }

  const renderComponent = () => {
    if (componentToRender === STOCK_FORM) {
      return <StockForm handleLike={handleLike} likeClassName={likeClassName} changeActiveComponent={changeActiveComponent} updateStocks={updateStocks} setLoadingStatus={setLoadingStatus}  />;
    } else if (componentToRender === COMPARE_FORM) {
      return <CompareForm handleLike={handleLike} likeClassName={likeClassName} changeActiveComponent={changeActiveComponent} updateStocks={updateStocks} setLoadingStatus={setLoadingStatus}  />;;
    } else {
      return null
    }
  }

  return (
    <div className='wrapper-with-close relative-position'>      
      {loading && <LoadingPanel />}
      <button onClick={cancel} className='close-btn'>x</button>
      {renderComponent()}
    </div>
  );
}

export default FormWrapper;
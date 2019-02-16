  import React, { useState, Fragment } from 'react';

import CompareForm from './CompareForm';
import FormWrapper from './FormWrapper';
import FormSelector from './FormSelector';
import NotFoundPanel from './NotFoundPanel';
import StockPanel from './StockPanel';
import ErrorPanel from './ErrorPanel';
import { COMPARE_FORM, NOT_FOUND_PANEL, STOCK_FORM, STOCK_PANEL, ERROR_PANEL } from './constants';

const Main = () => {
  const [activeComponent, changeActiveComponent] = useState('Form-Selector');
  const [stocks, updateStocks] = useState([]);

  const active = componentName => {
    let component;
    switch (componentName) {      
      case COMPARE_FORM:
        component = <FormWrapper changeActiveComponent={changeActiveComponent} updateStocks={updateStocks} componentToRender={COMPARE_FORM} />;
        break;
      case NOT_FOUND_PANEL:
        component = <NotFoundPanel changeActiveComponent={changeActiveComponent} updateStocks={updateStocks} />;
        break;
      case STOCK_FORM:
        component = <FormWrapper changeActiveComponent={changeActiveComponent} updateStocks={updateStocks} componentToRender={STOCK_FORM} />;
        break;
      case STOCK_PANEL:
        component = <StockPanel changeActiveComponent={changeActiveComponent} updateStocks={updateStocks} stocks={stocks} />;
        break;
      case ERROR_PANEL:
        component = <ErrorPanel changeActiveComponent={changeActiveComponent} />;
        break;
      default:
        component = <FormSelector changeActiveComponent={changeActiveComponent} />;
        break;
    }

    return component;
  }

  return (
    <Fragment>
      {active(activeComponent)}
    </Fragment>
  );
}

export default Main;
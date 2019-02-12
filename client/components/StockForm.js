import React from 'react';

const StockForm = ({ changeActiveComponent }) => {
  const cancel = () => {
    changeActiveComponent();
  };

  return (
    <div>
      <button onClick={cancel}>x</button>
      <form>
        <input type='text' placeholder='stock' autoFocus required name='stock' id='stock-input' />
        <input type='checkbox' id='like-input'/>
        <label htmlFor='like-input'>like</label>
        <button>get price</button>
      </form>
    </div>
  );
}

export default StockForm;
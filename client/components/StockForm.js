import React from 'react';

const StockForm = () => {
  return (
    <form>
      <input type='text' placeholder='stock' autoFocus required name='stock' id='stock-input' />
      <input type='checkbox' id='like-input'/>
      <label htmlFor='like-input'>like</label>
      <button>get price</button>
    </form>
  );
}

export default StockForm;
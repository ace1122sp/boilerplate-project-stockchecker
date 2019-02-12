import React from 'react';

const CompareForm = ({ changeActiveComponent }) => {
  const cancel = () => {
    changeActiveComponent();
  };

  return (
    <div>
      <button onClick={cancel}>x</button>
      <form>
        <input type='text' placeholder='stock a' autoFocus required name='stock-a' id='stock-input-a' />
        <input type='text' placeholder='stock b' required name='stock-b' id='stock-input-b' />
        <input type='checkbox' id='like-input' />
        <label htmlFor='like-input'>like both</label>
        <br />
        <button>compare</button>
      </form>
    </div>
  );
}

export default CompareForm;
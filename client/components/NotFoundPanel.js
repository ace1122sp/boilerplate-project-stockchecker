import React from 'react';

const NotFoundPanel = ({ changeActiveComponent }) => {
  const cancel = () => {
    changeActiveComponent();
  }

  return (
    <div>
      <button onClick={cancel}>x</button>
      <h2>Stock Not Found</h2>
    </div>
  );
}

export default NotFoundPanel;
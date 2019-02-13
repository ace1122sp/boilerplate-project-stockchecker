import React from 'react';

const ErrorPanel = ({ changeActiveComponent }) => {
  const cancel = () => {
    changeActiveComponent();
  }

  return (
    <div>
      <button onClick={cancel}>x</button>
      <h2>Snap... Something went wrong!</h2>
    </div>
  );
}

export default ErrorPanel;
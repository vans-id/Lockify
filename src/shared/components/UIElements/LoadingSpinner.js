import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
  return (
    <div
      className={`spinner-container ${
        props.asOverlay && 'asOverlay'
      }`}
    >
      <div className='lds-ripple'>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

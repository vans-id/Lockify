import React from 'react';

import './MainHeader.css';

const MainHeader = (props) => {
  return (
    <div className='header-container'>
      <header className='main-header'>
        {props.children}
      </header>
    </div>
  );
};

export default MainHeader;

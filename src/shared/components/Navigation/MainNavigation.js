import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.css';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import Sidedrawer from './Sidedrawer';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <Backdrop onClick={() => setIsOpen(false)} />
      )}

      <Sidedrawer
        show={isOpen}
        onClick={() => setIsOpen(false)}
      >
        <nav className='main-naviagtion__drawer-nav'>
          <NavLinks />
        </nav>
      </Sidedrawer>

      <MainHeader>
        <div
          className='main-nav-container'
          onClick={() => setIsOpen(true)}
        >
          <button className='main-navigation__menu-btn'>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <h2 className='main-navigation__title'>
          <Link to='/'>Lockify</Link>
        </h2>

        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;

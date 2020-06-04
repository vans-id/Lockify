import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';
import { AuthContext } from '../../context/auth-context';
import Button from '../FormElements/Button';

const NavLinks = (props) => {
  const { isLoggedIn, logout } = useContext(
    AuthContext
  );

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          Users
        </NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to='/u1/places'>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/places/new'>Places</NavLink>
          </li>
          <li>
            <Button
              type='button'
              onClick={logout}
              size='large'
            >
              LOGOUT
            </Button>
          </li>
        </>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to='/auth'>Account</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';
import Button from '../FormElements/Button';
import Avatar from '../UIElements/Avatar';

const NavLinks = (props) => {
  const {
    isLoggedIn,
    logout,
    userId,
    userName,
    userImage,
  } = useContext(AuthContext);

  let avatarImg = require('../../../assets/avatar.jpg');
  if (userImage) {
    avatarImg = `${process.env.REACT_APP_ASSET_URL}/${userImage}`;
  }

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          Travelers
        </NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to={`/${userId}/places`}>
              Profile
            </NavLink>
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
      <li className='nav-avatar'>
        <Avatar
          image={avatarImg}
          alt='avatar'
          className='nav-avatar-image'
        />
        <h2 className='nav-avatar-title'>
          {userName || 'Guest'}
        </h2>
      </li>
    </ul>
  );
};

export default NavLinks;

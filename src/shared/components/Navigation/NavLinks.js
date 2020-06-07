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

  let avatarUrl =
    'https://secure.gravatar.com/avatar/50c30aae0f1878a17788458f7fefbcfe?s=252&d=mm&r=g';
  if (userImage) {
    avatarUrl = `http://localhost:5000/${userImage}`;
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
          image={avatarUrl}
          alt='avatar'
          className='nav-avatar-image'
        />
        <h3 className='nav-avatar-title'>
          {userName || 'Guest'}
        </h3>
      </li>
    </ul>
  );
};

export default NavLinks;

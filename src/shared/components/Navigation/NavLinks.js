import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = (props) => {
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          Users
        </NavLink>
      </li>
      <li>
        <NavLink to='/u1/places'>Profile</NavLink>
      </li>
      <li>
        <NavLink to='/places/new'>Places</NavLink>
      </li>
      <li>
        <NavLink to='/auth'>Auth</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;

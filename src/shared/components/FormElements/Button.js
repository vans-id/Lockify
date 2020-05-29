import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = (props) => {
  if (props.href) {
    return (
      <a
        href={props.href}
        className={`button button--${
          props.size || 'default'
        } ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${
          props.size || 'default'
        } ${props.danger && 'button--danger'} ${
          props.inverse && 'button--inverse'
        }`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`button button--${
        props.size || 'default'
      } ${props.danger && 'button--danger'} ${
        props.inverse && 'button--inverse'
      } ${props.disabled && 'button--disabled'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

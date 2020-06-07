import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Sidedrawer.css';

const Sidedrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={400}
      classNames='slide-in-right'
      mountOnEnter
      unmountOnExit
    >
      <aside
        className='side-drawer'
        onClick={props.onClick}
      >
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('drawer-hook')
  );
};

export default Sidedrawer;

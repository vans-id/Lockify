import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.css';
import Backdrop from './Backdrop';

const ModalOverlay = (props) => {
  const content = (
    <div
      className={`modal ${props.className}`}
      style={props.style}
    >
      <header
        className={`modal__header ${props.headerClass}`}
      >
        <h4>{props.headerProperty}</h4>
      </header>
      <form
        onSubmit={
          props.onSubmit
            ? props.onSubmit
            : (e) => {
                e.preventDefault();
              }
        }
      >
        <div
          className={`modal__content ${props.contentClass}`}
        >
          {props.children}
        </div>
        <footer
          className={`modal__footer ${props.footerClass}`}
        >
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook')
  );
};

const Modal = (props) => {
  return (
    <>
      {props.show && (
        <Backdrop onClick={props.onCancel} />
      )}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={400}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;

import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      headerProperty='Error Message'
      show={!!props.error}
      footer={
        <Button onClick={props.onClear} size='large'>
          OK
        </Button>
      }
    >
      {props.error}
    </Modal>
  );
};

export default ErrorModal;

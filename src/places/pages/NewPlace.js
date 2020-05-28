import React from 'react';

import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

const NewPlace = () => {
  return (
    <form className='place-form'>
      <Input
        element='input'
        label='Title'
        placeholder='Enter Title'
      />
      <Button size='large'>Add</Button>
    </form>
  );
};

export default NewPlace;

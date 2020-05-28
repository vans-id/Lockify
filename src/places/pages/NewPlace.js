import React from 'react';

import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE } from '../../shared/utils/Validators';

const NewPlace = () => {
  return (
    <form className='place-form'>
      <Input
        element='input'
        label='Title'
        placeholder='Enter Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid Title'
      />
      <Button size='large'>Post</Button>
    </form>
  );
};

export default NewPlace;

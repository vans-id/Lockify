import React from 'react';

import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/Validators';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

const NewPlace = () => {
  const [state, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );

  const placeSubmitHandler = (e) => {
    e.preventDefault();
    console.log(state.inputs);
  };

  return (
    <form
      className='place-form'
      onSubmit={placeSubmitHandler}
    >
      <Input
        id='title'
        element='input'
        label='Title'
        placeholder='Enter title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid Title'
        onInput={inputHandler}
      />
      <Input
        id='description'
        label='Description'
        placeholder='Enter description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid Description (min 5 characters)'
        onInput={inputHandler}
      />
      <Input
        id='address'
        element='input'
        label='Address'
        placeholder='Enter address'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid Address'
        onInput={inputHandler}
      />
      <Button
        type='submit'
        disabled={!state.isValid}
        size='large'
        inverse
      >
        POST
      </Button>
    </form>
  );
};

export default NewPlace;

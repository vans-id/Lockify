import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/Validators';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const NewPlace = () => {
  const [state, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );
  const {
    error,
    isLoading,
    sendRequest,
    clearError,
  } = useHttpClient();
  const { userId } = useContext(AuthContext);
  const history = useHistory();

  const placeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        JSON.stringify({
          title: state.inputs.title.value,
          description: state.inputs.description.value,
          address: state.inputs.address.value,
          creator: userId,
        }),
        { 'Content-Type': 'application/json' }
      );
      // Redirect user to diffrent page
      history.push('/');
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      {isLoading && <LoadingSpinner asOverlay />}
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
    </>
  );
};

export default NewPlace;

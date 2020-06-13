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
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const NewPlace = () => {
  const [state, inputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
      image: { value: undefined, isValid: false },
    },
    false
  );
  const {
    error,
    isLoading,
    sendRequest,
    clearError,
  } = useHttpClient();
  const { token } = useContext(AuthContext);
  const history = useHistory();

  const placeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append(
        'title',
        state.inputs.title.value
      );
      formData.append(
        'description',
        state.inputs.description.value
      );
      formData.append(
        'address',
        state.inputs.address.value
      );
      formData.append(
        'image',
        state.inputs.image.value
      );

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places`,
        'POST',
        formData,
        { Authorization: `Bearer ${token}` }
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
        <ImageUpload
          id='image'
          center
          onInput={inputHandler}
          errorText='Please provide an image'
        />
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

import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/Validators';
import { AuthContext } from '../../shared/context/auth-context';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [
    identifiedPlace,
    setIdentifiedPlace,
  ] = useState();
  const [state, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const {
    error,
    isLoading,
    clearError,
    sendRequest,
  } = useHttpClient();
  const history = useHistory();
  const { userId, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setIdentifiedPlace(data.place);
        setFormData(
          {
            title: {
              value: data.place.title,
              isValid: true,
            },
            description: {
              value: data.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: state.inputs.title.value,
          description: state.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      );
      history.push(`/${userId}/places`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!identifiedPlace && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Oops! Cannot find selected place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && identifiedPlace && (
        <form
          className='place-form'
          onSubmit={updateHandler}
        >
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid Title'
            onInput={inputHandler}
            initialValue={identifiedPlace.title}
            initialValid={true}
            placeholder='Enter title'
          />
          <Input
            id='description'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid Description(min 5 characters)'
            onInput={inputHandler}
            initialValue={identifiedPlace.description}
            initialValid={true}
            placeholder='Enter description'
          />
          <Button
            type='submit'
            disabled={!state.isValid}
            size='large'
            inverse
          >
            UPDATE
          </Button>
          <Button
            type='button'
            onClick={() => history.goBack()}
            size='large'
          >
            CANCEL
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;

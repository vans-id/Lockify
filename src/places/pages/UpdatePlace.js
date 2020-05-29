import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/Validators';
import { useForm } from '../../shared/hooks/form-hook';

const PLACES = [
  {
    id: 'p1',
    title: 'Vatikan Hill',
    description: 'Awesome city awesome hill',
    imageUrl:
      'https://i.pinimg.com/originals/4c/4b/4b/4c4b4b13cd27bfeeb3d25b491f3d464b.jpg',
    address:
      'Colle Vaticano 00120 Vatican City Vatikan',
    location: [12.4492954, 41.9023751],
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Aachen Cathedral',
    description: 'Awesome city awesome hill',
    imageUrl:
      'https://www.timetravelturtle.com/wp-content/uploads/2015/04/German_Heritage-2014-2436_feat.jpg',
    address: 'Domhof 1, 52062 Aachen, German',
    location: [6.0838523, 50.774699],
    creator: 'u2',
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);
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

  const identifiedPlace = PLACES.find(
    (p) => p.id === placeId
  );

  useEffect(() => {
    setFormData(
      {
        title: {
          value: identifiedPlace.title,
          isValid: true,
        },
        description: {
          value: identifiedPlace.description,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const updateHandler = (e) => {
    e.preventDefault();
    console.log(state.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Not Found</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='center'>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
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
        initialValue={state.inputs.title.value}
        initialValid={state.inputs.title.isValid}
        placeholder='Enter title'
      />
      <Input
        id='description'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid Description(min 5 characters)'
        onInput={inputHandler}
        initialValue={state.inputs.description.value}
        initialValid={state.inputs.description.isValid}
        placeholder='Enter description'
      />
      <Button
        type='submit'
        disabled={!state.isValid}
        size='large'
      >
        UPDATE
      </Button>
    </form>
  );
};

export default UpdatePlace;

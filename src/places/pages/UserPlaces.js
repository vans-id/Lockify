import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const userId = useParams().userId;
  const [places, setPlaces] = useState();
  const {
    error,
    isLoading,
    clearError,
    sendRequest,
  } = useHttpClient();

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setPlaces(data.places);
      } catch (err) {}
    };

    fetchUserPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedId) => {
    setPlaces((prevPlace) =>
      prevPlace.filter(
        (place) => deletedId !== place.id
      )
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && (
        <PlaceList
          items={places}
          onDeletePlace={placeDeletedHandler}
        />
      )}
    </>
  );
};

export default UserPlaces;

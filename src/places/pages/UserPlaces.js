import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [places, setPlaces] = useState();
  const userId = useParams().userId;
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
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setPlaces(data.places);
        setAvatarUrl(data.avatarUrl);
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
          avatar={avatarUrl}
        />
      )}
    </>
  );
};

export default UserPlaces;

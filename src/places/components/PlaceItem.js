import React, { useState, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './PlaceItem.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(
    false
  );
  const {
    error,
    isLoading,
    clearError,
    sendRequest,
  } = useHttpClient();
  const { userId } = useContext(AuthContext);

  const deleteHandler = async () => {
    setShowConfirm(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        'DELETE'
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={() => setShowMap(false)}
        headerProperty={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={
          <Button onClick={() => setShowMap(false)}>
            <i className='fas fa-times'></i>
          </Button>
        }
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirm}
        onCancel={() => setShowConfirm(false)}
        headerProperty='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <>
            <Button
              onClick={() => setShowConfirm(false)}
            >
              <i className='fas fa-times'></i>
            </Button>
            <Button danger onClick={deleteHandler}>
              <i className='fas fa-check'></i>
            </Button>
          </>
        }
      >
        <p>
          Please note that it can't be undone
          thereafter
        </p>
      </Modal>

      {isLoading && <LoadingSpinner asOverlay />}

      <li className='place-item'>
        <Card className='place-item__content'>
          <div className='place-item__image'>
            <img src={props.image} alt={props.title} />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button onClick={() => setShowMap(true)}>
              <i className='fas fa-map-marked-alt'></i>
            </Button>
            {userId === props.creatorId && (
              <>
                <Button to={`/places/${props.id}`}>
                  <i className='fas fa-user-edit'></i>
                </Button>
                <Button
                  onClick={() => setShowConfirm(true)}
                >
                  <i className='fas fa-trash-alt'></i>
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

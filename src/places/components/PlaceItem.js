import React, { useState } from 'react';

import './PlaceItem.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
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
            <Button
              inverse
              onClick={() => setShowMap(true)}
            >
              <i className='fas fa-map-marked-alt'></i>
            </Button>
            <Button to={`/places/${props.id}`}>
              <i className='fas fa-user-edit'></i>
            </Button>
            <Button danger>
              <i className='fas fa-trash-alt'></i>
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

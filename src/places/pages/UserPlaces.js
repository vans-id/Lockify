import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

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

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = PLACES.filter(
    (place) => place.creator === userId
  );

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;

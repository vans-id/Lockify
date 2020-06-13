import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();
  const { zoom, center } = props;

  useEffect(() => {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken =
      process.env.REACT_APP_MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom,
      center,
    });
    new mapboxgl.Marker().setLngLat(center).addTo(map);
  }, [zoom, center]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;

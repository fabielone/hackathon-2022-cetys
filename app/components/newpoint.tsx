import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import Map, {Marker, NavigationControl} from 'react-map-gl';

import ControlPanel from '../control-panel';
import Pin from '../pin';

import type {MarkerDragEvent, LngLat} from 'react-map-gl';

const TOKEN = 'pk.eyJ1IjoiZmFiaWVsIiwiYSI6ImNsYWRiYXZ6dDBpZTczcXBlaWVmdWdrc20ifQ.jSrcGTJJTohUZv8KxBvFdA'; // Set your mapbox token here

const initialViewState = {
  latitude: 32,
  longitude: -115,
  zoom: 3.5
};

export default function NewPoint() {
  const [marker, setMarker] = useState({
    latitude: 31.876307159579724,
    longitude: -116.6543163345687
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
  }, []);

  return (
    <>
      <Map
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
        style={{width: "100vw", height: "100vh"}}
        maxBounds={[-118,27,-112,33]}
       
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
          
        />
         

        <NavigationControl />
      </Map>
      <ControlPanel events={events} />
    </>
  );
}
import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import Map, {Marker, NavigationControl} from 'react-map-gl';

import ControlPanel from '../control-panel';
import Pin from '../pin';

import type {MarkerDragEvent, LngLat} from 'react-map-gl';

const TOKEN = 'pk.eyJ1IjoiZmFiaWVsIiwiYSI6ImNsYWRiYXZ6dDBpZTczcXBlaWVmdWdrc20ifQ.jSrcGTJJTohUZv8KxBvFdA'; // Set your mapbox token here

export function links() {
  return [{ rel: "stylesheet", href: "https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" }]
}
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
        style={{width: "50vw", height: "50vh"}}
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
         

        
      </Map>


<form>
<div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 py-10">
   <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
       <label htmlFor="comment" className="sr-only">Your comment</label>
       <input value={'title'} ></input>
       <textarea id="comment" rows={4} className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
   </div>
   <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
       <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
           Post comment
       </button>
       <div className="flex pl-0 space-x-1 sm:pl-2">
           <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
               <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
               <span className="sr-only">Attach file</span>
           </button>
           <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
               <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
               <span className="sr-only">Set location</span>
           </button>
           <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
               <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
               <span className="sr-only">Upload image</span>
           </button>
       </div>
   </div>
</div>
</form>
    
    </>
  );
}
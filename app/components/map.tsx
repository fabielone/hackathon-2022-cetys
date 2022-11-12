import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import {render} from 'react-dom';


import ControlPanel from '../control-panel';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from '../layers';

import Map, { Source, Layer, Marker, NavigationControl, Popup, MapRef, GeoJSONSource, } from 'react-map-gl';
import { Outlet, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';



export function links() {
    return [{ rel: "stylesheet", href: "https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" }]
  }

  
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmFiaWVsIiwiYSI6ImNsYWRiYXZ6dDBpZTczcXBlaWVmdWdrc20ifQ.jSrcGTJJTohUZv8KxBvFdA'; // Set your mapbox token here


  interface PopupInfo {
   
    text: string;
    body: string;
  }

interface Features {

  type : string;
  properties : {title:string,body:string};
  geometry: {coordinates:[number,number],type:string};
}

interface Posts {
type : string;
features : Array<object>;
}
 

  export let loader: LoaderFunction = () => {

    type NewType = Posts;

    let data : NewType = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "title":"firstpoin",
            "body" :"description"
          },
          "geometry": {
            "coordinates": [
              -115.74933511304611,
              31.03655592360704
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {
            "title":"firstpoin2",
            "body" :"description"},
          "geometry": {
            "coordinates": [
              -115.74933511304611,
              31.0365592360704
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {
            "title":"firstpoin",
            "body" :"description"},
          "geometry": {
            "coordinates": [
              -116.23068083112632,
              31.476090156146242
            ],
            "type": "Point"
          }
        },
        {
          "type": "Feature",
          "properties": {
            "title":"firstpoin",
            "body" :"description"},
          "geometry": {
            "coordinates": [
              -116.60768819372316,
              31.868890512100847
            ],
            "type": "Point"
          }
        }
      ]
    }

    return json(data);

  }
export default function MapC(){

  let data1  = useLoaderData<Posts>();

  

    const mapRef = useRef<MapRef>(null);
 

    const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
    const onClick = (event: { features: any[]}) => {
     
    
      const feature = event.features[0];
      const clusterId = feature.properties.cluster_id;
  
      if(clusterId){
  
      const mapboxSource = mapRef.current.getSource('earthquakes') as GeoJSONSource;
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }
  
  
        
  
        mapRef.current.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500
        });
      });
      
  
    };
  
    if (event.features.length > 0 ) {
      setPopupInfo({
      
       
        text: feature.properties.title,
        body: feature.properties.body
      })
    };
  
  }
  
    

    return(

 
        <>
         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">1. Fin de La Pobresa</h5>
            <Map
                initialViewState={{
                 latitude: 40,
                longitude: -100,
                zoom: 3
                }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id!]}
        onClick={onClick}
        ref={mapRef}
        style={{width: "80%", height: "70%"}}
        maxBounds={[-118,27,-112,33]}
        >
        
        <Source
          id="earthquakes"
          type="geojson"
          data= {data1}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
  
            </Map>
    {popupInfo && (<div className="mt-20 left:6 z-10 block p-6 w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{popupInfo.text}</h5>
<p className="font-normal text-gray-700 dark:text-gray-400">
  
  {popupInfo.body}
  </p>





</div>) }
            

<form>
<div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 py-10">
   <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
       <label htmlFor="comment" className="sr-only">Your comment</label>
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

          
  
      
      
  
       
       

    
    )

}
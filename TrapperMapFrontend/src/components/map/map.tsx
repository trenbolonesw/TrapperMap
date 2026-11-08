


import React, {  useState,useRef,useEffect } from 'react'
import { View,Text } from 'react-native'
import {  mapStyles } from '@/utils/mapstyles'
import { FeatureCollection} from 'geojson'
import {Map,Layer,Marker,
  FullscreenControl,
  GeolocateControl,
TerrainControl,
  useMap,
  Source,
  ScaleControl,



} from '@vis.gl/react-maplibre'
import * as turf from '@turf/turf'
import {MapProvider} from '@vis.gl/react-maplibre';
import {  setWorkerUrl } from 'maplibre-gl';


import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LayerProps } from '@vis.gl/react-maplibre'


import { MAP_STYLE } from '@/utils/mapstyles';
import { videoStyle } from '@/utils/mapstyles';

if (typeof window !== 'undefined') {
  setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');
}





export function Mapping(){

const pointLayer: LayerProps = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};



async function getCoords(): Promise<{ lat: number; lon: number } | null>{
if ("geolocation" in navigator) {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
});

return {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
} else {
  /* geolocation IS NOT available */
  console.log('coords not available...')
}

return null;

}
const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);


const previousPosition = useRef<[number, number] | null>(null);

useEffect(() => {
  getCoords().then(setCoords);
}, []);

type pointprops = {
  lat:number,
  lon:number
  
}

useEffect(() => {
  const watchId = navigator.geolocation.watchPosition((position) => {


    setCoords({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  });

  return () => navigator.geolocation.clearWatch(watchId);
}, []);

const animateMarker = (
  start: [number, number],
  end: [number, number],
  progress: number
) => {
  return [
    start[0] + (end[0] - start[0]) * progress,
    start[1] + (end[1] - start[1]) * progress
  ];
};






function pointOnCircle({lon,lat}:pointprops):PointData {
 
 return {
   type:'Point',
   coordinates:[lon,lat]
 }   

}

type PointData = {
  type: 'Point';
  coordinates: number[];
};

  const [pointData, setPointData] = useState<PointData |null>(null);

  

  useEffect(() => {
  if (!coords) return;

  const end: [number, number] = [
    coords.lon,
    coords.lat
  ];

  const start = previousPosition.current;


  if (start === null) {
  previousPosition.current = end;

  setPointData(pointOnCircle({
    lon: end[0],
    lat: end[1]
  }));

  return;
}

const animationStart: [number, number] = start;



  // First GPS position: display immediately
  if (!start) {
    previousPosition.current = end;
    setPointData(pointOnCircle({
      lon: end[0],
      lat: end[1]
    }));
    return;
  }

  const duration = 1000;
  const startTime = performance.now();

  let animation: number;

  function updateMarker(time: number) {
    const progress = Math.min(
      (time - startTime) / duration,
      1
    );

    const position = animateMarker(animationStart, end, progress);

    setPointData(pointOnCircle({
      lon: position[0],
      lat: position[1]
    }));

    if (progress < 1) {
      animation = requestAnimationFrame(updateMarker);
    }
  }

  animation = requestAnimationFrame(updateMarker);

  previousPosition.current = end;

  return () => cancelAnimationFrame(animation);

}, [coords]);

type coords = {
  longitude:number,
  latitude:number,
  zoom:number
}



 const [viewState, setViewState] = useState<coords |null>(null);

  
useEffect(() => {
  if (!coords) return;

  setViewState({
    longitude: coords.lon,
    latitude: coords.lat,
    zoom: 12
  });
}, [coords]);

const GEOFENCE = turf.circle([-97.588889,49.35472], 5000, {units: 'kilometers'});


const onmove = React.useCallback(({viewState}:{viewState:coords}) => {
    

   const newCenter:[number,number] |undefined = [viewState.longitude, viewState.latitude];
  

    // Only update the view state if the center is inside the geofence
    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      setViewState(viewState);
      
    }
    
  
},[])

const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: pointData ? [
    {properties:{}, type: 'Feature', geometry: {type: 'Point', coordinates: pointData.coordinates}}
  ]:[]
};






return (
    <>
    <View style={mapStyles.view}>
       
 <MapProvider>
 { coords ? 
   <Map
   initialViewState={
    {
     
    }
   }
    style={mapStyles.map}
    mapStyle={MAP_STYLE}
    
    {...viewState}
    onMove={onmove}
    
  >
  {pointData && (
    <Source type='geojson' data={geojson}>
    <Layer {...pointLayer}/>
    </Source>
  )}
    <FullscreenControl/>
    <GeolocateControl 
    positionOptions={{
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0,
  }}
  trackUserLocation={true}
  showUserLocation={true}
  showAccuracyCircle={true}

    />
    <TerrainControl source='terrainSource'/>
   
  <Marker
  latitude={49.354722}
  longitude={-97.588889}
  >
 <MaterialCommunityIcons style={mapStyles.marker} name='square'/>
  </Marker>
    <ScaleControl />
  </Map>
: <Text>loading...</Text>
}
</MapProvider>
    </View>
    </>
)
}


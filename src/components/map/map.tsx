import { MutableRefObject, useEffect, useRef } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import './map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootReducerState } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import MapMarker from './MapMarker';
import useMapInteractions from '../../hooks/useMapInteractions';

const Map = () => {
  const mapContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const mapRef = useRef() as MutableRefObject<mapboxgl.Map>;
  useMapInteractions({ mapRef });

  const annotations = useSelector(
    (state: RootReducerState) => state.annotations
  );

  useEffect(() => {
    if (process.env.REACT_APP_MAPBOXGL_API_KEY === undefined) {
      throw new Error('REACT_APP_MAPBOXGL_API_KEY is undefined');
    }
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_API_KEY;

    if (mapContainerRef.current) {
      // Coordinates of the corners of the image
      const imageCorners: LngLatLike[] = [
        [-123.10006191, 44.55455659],
        [-123.09966229, 44.55455659],
        [-123.09966229, 44.55391499],
        [-123.10006191, 44.55391499],
      ];

      const bounds = imageCorners.reduce(
        (bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds([imageCorners[0], imageCorners[0]])
      );

      const map = new mapboxgl.Map({
        container: mapContainerRef.current || '',
        style: 'mapbox://styles/mapbox/streets-v11',
        bounds: bounds,
        fitBoundsOptions: { padding: 20 }, // padding around the bounding box
      });
      // Store the map reference to give other components access to the map
      mapRef.current = map;

      map.on('load', function () {
        // Add image of building and place on map
        map.addSource('building-image', {
          type: 'image',
          url: '/downstairs-map.png',
          coordinates: imageCorners as number[][],
        });
        map.addLayer({
          id: 'building-image',
          type: 'raster',
          source: 'building-image',
          paint: { 'raster-opacity': 0.85 }, // adjust transparency as needed
        });
      });
    }
  }, [mapContainerRef]);

  return (
    <div id='map' ref={mapContainerRef}>
      {annotations.annotationMarkers.map((marker, idx) => (
        <MapMarker
          key={`Map-annotationMarkers-${marker.id}-${idx}`}
          mapRef={mapRef}
          marker={marker}
        />
      ))}
    </div>
  );
};

export default Map;

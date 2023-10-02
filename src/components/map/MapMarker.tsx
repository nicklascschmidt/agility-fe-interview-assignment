import mapboxgl from 'mapbox-gl';
import { FC, MutableRefObject, useEffect, useRef } from 'react';
import { ANNOTATION_TYPES_DATA } from '../../constants/annotationConstants';
import { AnnotationMarker } from '../../types/annotationTypes';
import ReactDOM from 'react-dom/client';

type MapMarkerProps = {
  mapRef: MutableRefObject<mapboxgl.Map>;
  marker: AnnotationMarker;
};

const MapMarker: FC<MapMarkerProps> = ({ mapRef, marker }) => {
  const markerEl = useRef<HTMLDivElement>(document.createElement('div'));

  // When annotation marker data is updated, re-render all map markers
  useEffect(() => {
    const annotationTypeData = ANNOTATION_TYPES_DATA[marker.id];
    ReactDOM.createRoot(markerEl.current).render(
      <div title={annotationTypeData.name}>{annotationTypeData.icon}</div>
    );
    const newMarker = new mapboxgl.Marker(markerEl.current)
      .setLngLat(marker.mapCoordinates)
      .addTo(mapRef.current);

    return () => {
      if (newMarker) {
        newMarker.remove();
      }
    };
  }, [mapRef, marker]);

  return null;
};

export default MapMarker;

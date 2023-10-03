import mapboxgl from 'mapbox-gl';
import { FC, MutableRefObject, useEffect, useRef } from 'react';
import { ANNOTATION_TYPES_DATA } from '../../constants/annotationConstants';
import { AnnotationMarker } from '../../types/annotationTypes';
import { createRoot, Root } from 'react-dom/client';

type MapMarkerProps = {
  mapRef: MutableRefObject<mapboxgl.Map>;
  marker: AnnotationMarker;
};

const MapMarker: FC<MapMarkerProps> = ({ mapRef, marker }) => {
  const markerEl = useRef<HTMLDivElement>(document.createElement('div'));
  const rootRef = useRef<Root>();

  // Ensure we've already created the react root before rendering the marker.
  // This useEffect will run twice when a marker is created, so the root will
  //  both be created and rendered upon user creation.
  useEffect(() => {
    if (rootRef.current) {
      const annotationTypeData = ANNOTATION_TYPES_DATA[marker.id];
      rootRef.current.render(
        <div title={annotationTypeData.name}>{annotationTypeData.icon}</div>
      );
    } else {
      rootRef.current = createRoot(markerEl.current);
    }

    const newMarker = new mapboxgl.Marker(markerEl.current)
      .setLngLat(marker.mapCoordinates)
      .addTo(mapRef.current);

    return () => {
      if (newMarker) {
        newMarker.remove();
      }
    };
  }, [mapRef, marker]);

  // There's no component returned, but there is one created and added to the map via the mapRef
  return null;
};

export default MapMarker;

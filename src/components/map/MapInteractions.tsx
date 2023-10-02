import mapboxgl from 'mapbox-gl';
import { FC, MutableRefObject, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/annotations_reducer';
import { RootReducerState } from '../../redux/reducers';
import { AnnotationMarker } from '../../types/annotationTypes';
import {
  ANNOTATION_TYPES_DATA,
  MAP_CLICK_ACTION_TYPE_ADD_NEW,
  MAP_CLICK_ACTION_TYPE_RELOCATE,
} from '../../constants/annotationConstants';

type MapInteractionsProps = {
  mapRef: MutableRefObject<mapboxgl.Map>;
};

const MapInteractions: FC<MapInteractionsProps> = ({ mapRef }) => {
  const dispatch = useDispatch();
  const annotations = useSelector(
    (state: RootReducerState) => state.annotations
  );

  const handleMapClick = useCallback(
    (e: mapboxgl.MapMouseEvent) => {
      if (annotations.activeAnnotationId) {
        const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        const annotationTypeData =
          ANNOTATION_TYPES_DATA[annotations.activeAnnotationId];
        const markerData: AnnotationMarker = {
          id: annotations.activeAnnotationId,
          name: annotationTypeData.name,
          mapCoordinates: coordinates,
        };

        switch (annotations.mapClickAction.actionType) {
          case MAP_CLICK_ACTION_TYPE_ADD_NEW:
            dispatch(actions.addAnnotationMarker(markerData));
            break;
          case MAP_CLICK_ACTION_TYPE_RELOCATE:
            dispatch(
              actions.updateAnnotationMarker({
                id: annotations.activeAnnotationId,
                markerData: markerData,
              })
            );
            break;
          default:
            break;
        }
        dispatch(actions.resetMapClickAction());
      }
    },
    [
      dispatch,
      annotations.activeAnnotationId,
      annotations.mapClickAction.actionType,
    ]
  );

  useEffect(() => {
    const mapRefToCleanup = mapRef.current;
    mapRef.current.on('click', handleMapClick);
    return () => {
      mapRefToCleanup.off('click', handleMapClick);
    };
  }, [mapRef, handleMapClick]);

  return null;
};

export default MapInteractions;

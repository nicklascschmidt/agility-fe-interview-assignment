import mapboxgl from 'mapbox-gl';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/annotations_reducer';
import { RootReducerState } from '../redux/reducers';
import { AnnotationMarker } from '../types/annotationTypes';
import {
  ANNOTATION_TYPES_DATA,
  MAP_CLICK_ACTION_TYPE_ADD_NEW,
  MAP_CLICK_ACTION_TYPE_RELOCATE,
} from '../constants/annotationConstants';
import { MapCoordinates } from '../types/mapTypes';

type UseMapInteractionsProps = {
  mapRef: MutableRefObject<mapboxgl.Map>;
};

// This hook enables the functionality for user interactions with the map.
// User interactions mutate data in the annotations_reducer, which
//  will trigger updates to the map and map markers from this hook.
const useMapInteractions = ({ mapRef }: UseMapInteractionsProps): void => {
  const dispatch = useDispatch();
  const annotations = useSelector(
    (state: RootReducerState) => state.annotations
  );

  // When the map is clicked (and we're awaiting a click event), create a
  //  marker or update a marker's position.
  const handleMapClick = useCallback(
    (e: mapboxgl.MapMouseEvent) => {
      console.log('registering map click', e);

      if (annotations.activeAnnotationId) {
        const coordinates: MapCoordinates = [e.lngLat.lng, e.lngLat.lat];
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

  // When the user clicks to add/edit an annotation, listen for a map click.
  // On click, fire handleMapClick.
  useEffect(() => {
    let mapRefToCleanup = mapRef.current;
    if (annotations.mapClickAction.isAwaitingMapClick) {
      mapRefToCleanup.on('click', handleMapClick);
    } else {
      mapRefToCleanup?.off('click', handleMapClick);
    }
    return () => {
      mapRefToCleanup?.off('click', handleMapClick);
    };
  }, [mapRef, handleMapClick, annotations.mapClickAction.isAwaitingMapClick]);

  // If we're awaiting a map click, then change the cursor, but otherwise keep the default mapbox setting.
  useEffect(() => {
    if (mapRef.current) {
      if (annotations.mapClickAction.isAwaitingMapClick) {
        mapRef.current.getCanvas().style.cursor = 'crosshair';
      } else {
        mapRef.current.getCanvas().style.cursor = '';
      }
    }
  }, [mapRef, annotations.mapClickAction.isAwaitingMapClick]);

  // When the user clicks to go to a marker's position, fire mapbox's flyTo(coordinates) method.
  useEffect(() => {
    if (annotations.mapFlyToCoordinates) {
      mapRef.current.flyTo({
        center: annotations.mapFlyToCoordinates,
      });
      dispatch(actions.setMapFlyToCoordinates(null));
    }
  }, [dispatch, mapRef, annotations.mapFlyToCoordinates]);

  return;
};

export default useMapInteractions;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Annotation, AnnotationMarker } from '../types/annotationTypes';
import {
  MAP_CLICK_ACTION_TYPE_ADD_NEW,
  MAP_CLICK_ACTION_TYPE_RELOCATE,
} from '../constants/annotationConstants';
import { MapCoordinates } from '../types/mapTypes';

const initialState = {
  activeAnnotationId: null as Annotation['id'] | null,
  mapClickAction: {
    isAwaitingMapClick: false as boolean,
    actionType: null as
      | typeof MAP_CLICK_ACTION_TYPE_ADD_NEW
      | typeof MAP_CLICK_ACTION_TYPE_RELOCATE
      | null,
  },
  annotationMarkers: [] as AnnotationMarker[],
  mapFlyToCoordinates: null as MapCoordinates | null,
};

const annotationsSlice = createSlice({
  name: 'annotations',
  initialState,
  reducers: {
    setActiveAnnotationId(
      state,
      action: PayloadAction<typeof initialState.activeAnnotationId>
    ) {
      state.activeAnnotationId = action.payload;
    },
    setMapClickAction(
      state,
      action: PayloadAction<typeof initialState.mapClickAction.actionType>
    ) {
      state.mapClickAction = {
        isAwaitingMapClick: true,
        actionType: action.payload,
      };
    },
    resetMapClickAction(state) {
      state.mapClickAction = initialState.mapClickAction;
    },
    addAnnotationMarker(state, action: PayloadAction<AnnotationMarker>) {
      const nextState = [...state.annotationMarkers];
      nextState.push(action.payload);
      state.annotationMarkers = nextState;
    },
    removeAnnotationMarker(
      state,
      action: PayloadAction<AnnotationMarker['id']>
    ) {
      const nextState = state.annotationMarkers.filter(
        (marker) => marker.id !== action.payload
      );
      state.annotationMarkers = nextState;
    },
    updateAnnotationMarker(
      state,
      action: PayloadAction<{
        id: AnnotationMarker['id'];
        markerData: AnnotationMarker;
      }>
    ) {
      const markerIndex = state.annotationMarkers.findIndex(
        (marker) => marker.id === action.payload.id
      );
      const nextMarkers = [...state.annotationMarkers];
      nextMarkers.splice(markerIndex, 1, action.payload.markerData);
      state.annotationMarkers = nextMarkers;
    },
    setMapFlyToCoordinates(
      state,
      action: PayloadAction<typeof initialState.mapFlyToCoordinates>
    ) {
      state.mapFlyToCoordinates = action.payload;
    },
  },
});

export const { actions } = annotationsSlice;
export default annotationsSlice.reducer;

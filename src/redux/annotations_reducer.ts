import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Annotation, AnnotationMarker } from '../types/annotationTypes';
import {
  MAP_CLICK_ACTION_TYPE_ADD_NEW,
  MAP_CLICK_ACTION_TYPE_RELOCATE,
} from '../constants/annotationConstants';

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
};

const annotationsSlice = createSlice({
  name: 'annotations',
  initialState,
  reducers: {
    // TODO: change these to typeof initialState.activeAnnotationId etc
    setActiveAnnotationId(
      state,
      action: PayloadAction<Annotation['id'] | null>
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
      action: PayloadAction<{ id: string; data: AnnotationMarker }>
    ) {
      const markerIndex = state.annotationMarkers.findIndex(
        (marker) => marker.id === action.payload.id
      );
      const nextMarkers = [...state.annotationMarkers];
      nextMarkers.splice(markerIndex, 1, action.payload.data);
      state.annotationMarkers = nextMarkers;
    },
  },
});

export const { actions } = annotationsSlice;
export default annotationsSlice.reducer;

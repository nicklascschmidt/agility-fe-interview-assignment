import { createSlice } from '@reduxjs/toolkit';
import { Annotation } from '../types/annotationTypes';

const initialState = {
  activeAnnotationId: null,
  annotationOptions: [
    {
      id: 'triangle',
      name: 'Triangle',
      mapCoordinates: [],
    },
    {
      id: 'square',
      name: 'Square',
      mapCoordinates: [],
    },
    {
      id: 'pentagon',
      name: 'Pentagon',
      mapCoordinates: [],
    },
  ] as Annotation[],
};

const annotationsSlice = createSlice({
  name: 'annotations',
  initialState,
  reducers: {
    setActiveAnnotationId(state, action) {
      state.activeAnnotationId = action.payload;
    }
  },
});

export const { actions } = annotationsSlice;
export default annotationsSlice.reducer;

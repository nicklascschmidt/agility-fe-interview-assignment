import { ReactNode } from 'react';

export type AnnotationIds =
  | 'circle'
  | 'triangle'
  | 'square'
  | 'diamond'
  | 'pentagon'
  | 'hexagon';
export type AnnotationName =
  | 'Circle'
  | 'Triangle'
  | 'Square'
  | 'Diamond'
  | 'Pentagon'
  | 'Hexagon';

export type Annotation = {
  id: AnnotationIds;
  name: AnnotationName;
  icon: ReactNode;
};

export type AnnotationMarker = {
  id: AnnotationIds;
  name: AnnotationName; // this is populated from ANNOTATION_TYPES_DATA at the moment, but could be user-inputted in the future
  mapCoordinates: [number, number]; // [lat, lng]
};

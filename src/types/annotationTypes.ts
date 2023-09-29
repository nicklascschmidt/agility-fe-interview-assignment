export type AnnotationName = 'Triangle' | 'Square' | 'Pentagon';

export type Annotation = {
  id: string;
  name: AnnotationName;
  mapCoordinates: number[]; // [lat, lng]
};

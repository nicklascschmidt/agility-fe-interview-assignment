import CircleIcon from '../icons/CircleIcon';
import TriangleIcon from '../icons/TriangleIcon';
import SquareIcon from '../icons/SquareIcon';
import DiamondIcon from '../icons/DiamondIcon';
import PentagonIcon from '../icons/PentagonIcon';
import HexagonIcon from '../icons/HexagonIcon';
import { Annotation } from '../types/annotationTypes';

export const ANNOTATION_TYPES_DATA: Record<Annotation['id'], Annotation> = {
  circle: {
    id: 'circle',
    name: 'Circle',
    icon: <CircleIcon />,
    numOfAngles: 0,
  },
  triangle: {
    id: 'triangle',
    name: 'Triangle',
    icon: <TriangleIcon />,
    numOfAngles: 3,
  },
  square: {
    id: 'square',
    name: 'Square',
    icon: <SquareIcon />,
    numOfAngles: 4,
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond',
    icon: <DiamondIcon />,
    numOfAngles: 4,
  },
  pentagon: {
    id: 'pentagon',
    name: 'Pentagon',
    icon: <PentagonIcon />,
    numOfAngles: 5,
  },
  hexagon: {
    id: 'hexagon',
    name: 'Hexagon',
    icon: <HexagonIcon />,
    numOfAngles: 6,
  },
};

export const MAP_CLICK_ACTION_TYPE_ADD_NEW = 'ADD_NEW';
export const MAP_CLICK_ACTION_TYPE_REMOVE_FROM = 'REMOVE_FROM';
export const MAP_CLICK_ACTION_TYPE_RELOCATE = 'RELOCATE';

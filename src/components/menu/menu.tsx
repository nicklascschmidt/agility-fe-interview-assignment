import { useSelector } from 'react-redux';
import FilterIcon from '../../icons/FilterIcon';
import {
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
} from '../../constants/styleConstants';
import styled from 'styled-components/macro';
import { MouseEventHandler, useEffect, useState } from 'react';
import {
  COLOR_BACKGROUND,
  COLOR_FOREGROUND,
  COLOR_BORDER,
} from '../../constants/colorConstants';
import { RootReducerState } from '../../redux/reducers';
import { Annotation } from '../../types/annotationTypes';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AnnotationActions from './AnnotationActions';
import AnnotationTypeList from './AnnotationTypeList';
import { ANNOTATION_TYPES_DATA } from '../../constants/annotationConstants';

const ANNOTATION_OPTIONS = Object.values(ANNOTATION_TYPES_DATA);
const MENU_WIDTH = '300px';
const MENU_HEIGHT = '400px';

const MenuContainer = styled.div`
  position: absolute;
  bottom: ${SPACING_LG};
  left: ${SPACING_MD};

  width: ${MENU_WIDTH};
  max-height: ${MENU_HEIGHT};
  padding: ${SPACING_MD} ${SPACING_SM};
  border: 1px solid ${COLOR_BORDER};
  border-radius: ${SPACING_SM};

  background-color: ${COLOR_BACKGROUND};
  color: ${COLOR_FOREGROUND};

  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: ${SPACING_MD};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${SPACING_SM};
`;

/**
 * TODO:
 * if we're awaiting a map click, then mute the opacity on the menu and
 *  put a message there "awaiting map click" "please choose a location"
 * "choose a location on map"
 */
const Menu = () => {
  const annotations = useSelector(
    (state: RootReducerState) => state.annotations
  );
  const [filteredAnnotations, setFilteredAnnotations] =
    useState<Annotation[]>(ANNOTATION_OPTIONS);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log('icon button clicked', e);
    // setActiveAnnotationId()
  };

  // When the filters change, update the list of annotations displayed.
  useEffect(() => {
    // setFilteredAnnotations(filteredAnnotations);
  }, [filteredAnnotations, activeFilters]);

  useEffect(() => {
    console.log('annotations', annotations);
  }, [annotations]);

  return (
    <MenuContainer>
      <HeaderRow>
        <h3 style={{ margin: 0 }}>Annotation Types</h3>
        <DropdownButton title={<FilterIcon />} autoClose='outside'>
          <Dropdown.Item as='button'>No angles</Dropdown.Item>
          <Dropdown.Item as='button'>3 angles</Dropdown.Item>
          <Dropdown.Item as='button'>4 angles</Dropdown.Item>
          <Dropdown.Item as='button'>{`>4 angles`}</Dropdown.Item>
          <Dropdown.Item as='button'>
            <HeaderRow>
              <div>taksjdf asdkjfh</div>
              <button>s</button>
            </HeaderRow>
          </Dropdown.Item>
        </DropdownButton>
      </HeaderRow>
      <AnnotationTypeList annotations={filteredAnnotations} />
      {annotations.activeAnnotationId ? <AnnotationActions /> : null}
    </MenuContainer>
  );
};

export default Menu;

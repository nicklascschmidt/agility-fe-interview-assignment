import { SPACING_MD, SPACING_SM } from '../../constants/styleConstants';
import styled from 'styled-components/macro';
import { useState } from 'react';
import {
  COLOR_BACKGROUND,
  COLOR_FOREGROUND,
  COLOR_BORDER,
} from '../../constants/colorConstants';
import { Annotation } from '../../types/annotationTypes';
import AnnotationActions from './AnnotationActions';
import AnnotationTypeList from './AnnotationTypeList';
import { ANNOTATION_OPTIONS } from '../../constants/annotationConstants';
import AnnotationFilterButton from './AnnotationFilterButton';

const MENU_WIDTH = '300px';
const MENU_HEIGHT = '400px';

const MenuContainer = styled.div`
  position: absolute;
  top: ${SPACING_MD};
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
  const [filteredAnnotations, setFilteredAnnotations] =
    useState<Annotation[]>(ANNOTATION_OPTIONS);

  return (
    <MenuContainer>
      <HeaderRow>
        <h3 style={{ margin: 0 }}>Annotation Types</h3>
        <AnnotationFilterButton
          setFilteredAnnotations={setFilteredAnnotations}
        />
      </HeaderRow>
      <AnnotationTypeList annotations={filteredAnnotations} />
      <AnnotationActions />
    </MenuContainer>
  );
};

export default Menu;

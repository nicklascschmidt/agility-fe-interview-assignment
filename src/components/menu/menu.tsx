import {
  SPACING_MD,
  SPACING_SM,
  Z_INDEX_MENU_OVERLAY_TEXT,
} from '../../constants/styleConstants';
import styled from 'styled-components/macro';
import { useState } from 'react';
import {
  COLOR_BACKGROUND,
  COLOR_FOREGROUND,
  COLOR_BORDER,
} from '../../constants/colorConstants';
import { Annotation } from '../../types/annotationTypes';
import AnnotationActions from './AnnotationActions';
import AnnotationsList from './AnnotationsList';
import { ANNOTATION_OPTIONS } from '../../constants/annotationConstants';
import AnnotationFilterButton from './AnnotationFilterButton';
import { useSelector } from 'react-redux';
import { RootReducerState } from '../../redux/reducers';

const MENU_WIDTH = '300px';
const MENU_HEIGHT = '400px';

const PositionContainer = styled.div`
  position: absolute;
  top: ${SPACING_MD};
  left: ${SPACING_MD};
`;

// When we're awaiting user map click, disallow cursor events
//  and show a CTA message to the user to click the map.
const MutedOpacityOverlay = styled.div<{ $isAwaitingMapClick: boolean }>`
  // This is ugly, but intellisense is broken for styled-components.css, so can't group logic together.
  position: ${({ $isAwaitingMapClick }) =>
    $isAwaitingMapClick ? 'relative' : ''};
  display: ${({ $isAwaitingMapClick }) => ($isAwaitingMapClick ? 'flex' : '')};
  justify-content: ${({ $isAwaitingMapClick }) =>
    $isAwaitingMapClick ? 'center' : ''};
  align-items: ${({ $isAwaitingMapClick }) =>
    $isAwaitingMapClick ? 'center' : ''};
  background-color: ${({ $isAwaitingMapClick }) =>
    $isAwaitingMapClick ? COLOR_BACKGROUND : ''};
  pointer-events: ${({ $isAwaitingMapClick }) =>
    $isAwaitingMapClick ? 'none' : ''};
  cursor: ${({ $isAwaitingMapClick }) =>
    $isAwaitingMapClick ? 'not-allowed' : ''};
`;

const OverlayText = styled.div`
  z-index: ${Z_INDEX_MENU_OVERLAY_TEXT};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${COLOR_FOREGROUND};
  text-align: center;
`;

const MenuContainer = styled.div<{ $isAwaitingMapClick: boolean }>`
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

  opacity: ${({ $isAwaitingMapClick }) => ($isAwaitingMapClick ? 0.25 : '')};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${SPACING_SM};
`;

const Menu = () => {
  const annotations = useSelector(
    (state: RootReducerState) => state.annotations
  );
  const [filteredAnnotations, setFilteredAnnotations] =
    useState<Annotation[]>(ANNOTATION_OPTIONS);

  return (
    <PositionContainer>
      {/* If we're awaiting user map click, show message on top of Menu and disallow actions */}
      <MutedOpacityOverlay
        $isAwaitingMapClick={annotations.mapClickAction.isAwaitingMapClick}
      >
        {annotations.mapClickAction.isAwaitingMapClick && (
          <OverlayText>Choose a location on map</OverlayText>
        )}
        <MenuContainer
          $isAwaitingMapClick={annotations.mapClickAction.isAwaitingMapClick}
        >
          <HeaderRow>
            <h3 style={{ margin: 0 }}>Annotations</h3>
            <AnnotationFilterButton
              setFilteredAnnotations={setFilteredAnnotations}
            />
          </HeaderRow>
          <AnnotationsList annotations={filteredAnnotations} />
          <AnnotationActions />
        </MenuContainer>
      </MutedOpacityOverlay>
    </PositionContainer>
  );
};

export default Menu;

import { useSelector, useDispatch } from 'react-redux';
import TriangleIcon from '../../icons/TriangleIcon';
import EyeIcon from '../../icons/EyeIcon';
import EyeSlashIcon from '../../icons/EyeSlashIcon';
import FilterIcon from '../../icons/FilterIcon';
import {
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
  SPACING_XS,
} from '../../constants/styleConstants';
import styled from 'styled-components/macro';
import { MouseEventHandler, useEffect, useState } from 'react';
import {
  COLOR_BACKGROUND,
  COLOR_FOREGROUND,
  COLOR_BORDER,
  COLOR_SECONDARY,
} from '../../constants/colorConstants';
import { RootReducerState } from '../../redux/reducers';
import { Annotation } from '../../types/annotationTypes';
import { actions } from '../../redux/annotations_reducer';

const MENU_WIDTH = '300px';

/*
TODO:
- show all icons
- allow for filtering
  - search by name
  - by number of angles
- show/hide option
  - show/hide all?
*/

const MenuContainer = styled.div`
  position: absolute;
  bottom: ${SPACING_LG};
  left: ${SPACING_MD};

  width: ${MENU_WIDTH};
  height: ${MENU_WIDTH}; // TODO: height should expand with the container and be capped at X height
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

const AnnotationsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AnnotationRow = styled.div<{ $isActive: boolean }>`
  display: flex;
  gap: ${SPACING_SM};
  background-color: ${({ $isActive }) => ($isActive ? COLOR_SECONDARY : '')};
  padding: ${SPACING_XS};
  &:hover {
    cursor: pointer;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: ${SPACING_SM};
`;

const Menu = () => {
  const annotations = useSelector(
    (state: RootReducerState) => state.annotations
  );
  const [filteredAnnotations, setFilteredAnnotations] = useState<Annotation[]>(
    []
  );
  const [activeFilters, setActiveFilters] = useState([]);

  const dispatch = useDispatch();

  /**
   * TODO: 
   * add handleFilterClick
   * add handleSwitchVisibilityClick
   * add handleAddAnnotationClick
   */
  const handleIconClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log('icon button clicked', e);
    // setActiveAnnotation()
  };

  // When the filters change, update the list of annotations displayed.
  useEffect(() => {
    setFilteredAnnotations(annotations.annotationOptions);
  }, [annotations.annotationOptions, activeFilters]);

  useEffect(() => {
    console.log('annotations', annotations);
  }, [annotations]);

  return (
    <MenuContainer>
      <HeaderRow>
        <h3 style={{ margin: 0 }}>Annotation Types</h3>
        <button onClick={handleIconClick}>
          <FilterIcon />
        </button>
      </HeaderRow>
      <AnnotationsContainer>
        {filteredAnnotations.map((annotation, idx) => {
          const isActive = annotations.activeAnnotationId === annotation.id;
          return (
            <AnnotationRow
              key={`AnnotationsContainer-filteredAnnotations-${annotation.id}-${idx}`}
              $isActive={isActive}
              onClick={() =>
                dispatch(
                  actions.setActiveAnnotationId(isActive ? null : annotation.id)
                )
              }
            >
              <TriangleIcon />
              {annotation.name}
            </AnnotationRow>
          );
        })}
      </AnnotationsContainer>
      {annotations.activeAnnotationId ? (
        <ActionsRow>
          <button onClick={handleIconClick}>
            <EyeSlashIcon />
          </button>
          {/* 
        TODO:
        if not on map yet, allow user to add to map - click on map to submit (disallow any other click, or can cancel)
        if already on map, allow user to move position - i.e. click on map to submit new location

        allow user to center the map around a certain icon
        */}
        </ActionsRow>
      ) : null}
    </MenuContainer>
  );
};

export default Menu;

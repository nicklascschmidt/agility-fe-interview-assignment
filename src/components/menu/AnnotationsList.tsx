import { useSelector, useDispatch } from 'react-redux';
import { SPACING_SM, SPACING_XS } from '../../constants/styleConstants';
import styled from 'styled-components/macro';
import { COLOR_SECONDARY } from '../../constants/colorConstants';
import { RootReducerState } from '../../redux/reducers';
import { Annotation } from '../../types/annotationTypes';
import { actions } from '../../redux/annotations_reducer';
import { FC } from 'react';

const AnnotationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  transition: height .5s ease-in-out;
`;

const AnnotationRow = styled.div<{ $isActive: boolean }>`
  display: flex;
  gap: ${SPACING_SM};
  background-color: ${({ $isActive }) => ($isActive ? COLOR_SECONDARY : '')};
  padding: ${SPACING_XS} ${SPACING_SM};
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

type AnnotationsListProps = {
  annotations: Annotation[];
};

const AnnotationsList: FC<AnnotationsListProps> = ({ annotations }) => {
  const stateAnnotations = useSelector(
    (state: RootReducerState) => state.annotations
  );
  const dispatch = useDispatch();

  return (
    <AnnotationsContainer>
      {annotations.map(({ id, name, icon }, idx) => {
        const isActive = stateAnnotations.activeAnnotationId === id;
        return (
          <AnnotationRow
            key={`AnnotationsContainer-filteredAnnotations-${id}-${idx}`}
            $isActive={isActive}
            onClick={() =>
              dispatch(actions.setActiveAnnotationId(isActive ? null : id))
            }
          >
            <IconContainer>{icon}</IconContainer>
            {name}
          </AnnotationRow>
        );
      })}
    </AnnotationsContainer>
  );
};

export default AnnotationsList;

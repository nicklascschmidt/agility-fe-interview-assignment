import { FC, MouseEventHandler, useMemo } from 'react';
import PlusIcon from '../../icons/PlusIcon';
import ArrowsMoveIcon from '../../icons/ArrowsMoveIcon';
import CrosshairIcon from '../../icons/CrosshairIcon';
import { SPACING_SM, SPACING_XS } from '../../constants/styleConstants';
import styled from 'styled-components/macro';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerState } from '../../redux/reducers';
import { actions } from '../../redux/annotations_reducer';
import DashIcon from '../../icons/DashIcon';
import {
  MAP_CLICK_ACTION_TYPE_ADD_NEW,
  MAP_CLICK_ACTION_TYPE_RELOCATE,
} from '../../constants/annotationConstants';

const ActionsRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: ${SPACING_SM};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING_XS};
`;

const AnnotationActions: FC = () => {
  const annotations = useSelector(
    (state: RootReducerState) => state.annotations
  );
  const dispatch = useDispatch();
  const areButtonsDisabled = !annotations.activeAnnotationId;
  const isMarkerPresentOnMap = useMemo(
    () =>
      annotations.annotationMarkers.some(
        (marker) => marker.id === annotations.activeAnnotationId
      ),
    [annotations.annotationMarkers, annotations.activeAnnotationId]
  );

  const handleAddToMapClick: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(actions.setMapClickAction(MAP_CLICK_ACTION_TYPE_ADD_NEW));
  };

  const handleRemoveFromMapClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (annotations.activeAnnotationId) {
      dispatch(actions.removeAnnotationMarker(annotations.activeAnnotationId));
    }
  };

  const handleRelocateMarkerClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(actions.setMapClickAction(MAP_CLICK_ACTION_TYPE_RELOCATE));
  };

  const handleCenterAroundMarker: MouseEventHandler<HTMLButtonElement> = () => {
    const activeMarkerCoordinates = annotations.annotationMarkers.find(
      ({ id }) => id === annotations.activeAnnotationId
    );
    if (activeMarkerCoordinates) {
      dispatch(
        actions.setMapFlyToCoordinates(activeMarkerCoordinates.mapCoordinates)
      );
    }
  };

  return (
    <ActionsRow>
      {isMarkerPresentOnMap ? (
        <Button
          size='sm'
          title='Remove from map'
          onClick={handleRemoveFromMapClick}
          disabled={areButtonsDisabled}
          variant='danger'
        >
          <IconContainer>
            <div>Remove</div>
            <DashIcon />
          </IconContainer>
        </Button>
      ) : (
        <Button
          size='sm'
          title='Add to map'
          onClick={handleAddToMapClick}
          disabled={areButtonsDisabled}
          variant='success'
        >
          <IconContainer>
            <div>Add</div>
            <PlusIcon />
          </IconContainer>
        </Button>
      )}
      <Button
        size='sm'
        title='Relocate marker'
        onClick={handleRelocateMarkerClick}
        disabled={areButtonsDisabled || !isMarkerPresentOnMap}
        variant='warning'
      >
        <IconContainer>
          <div>Relocate</div>
          <ArrowsMoveIcon />
        </IconContainer>
      </Button>
      <Button
        size='sm'
        title='Center around marker'
        onClick={handleCenterAroundMarker}
        disabled={areButtonsDisabled || !isMarkerPresentOnMap}
        variant='info'
      >
        <IconContainer>
          <div>Center</div>
          <CrosshairIcon />
        </IconContainer>
      </Button>
    </ActionsRow>
  );
};

export default AnnotationActions;

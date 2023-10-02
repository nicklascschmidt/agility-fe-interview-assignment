import { FC, MouseEventHandler, useMemo } from 'react';
import PlusIcon from '../../icons/PlusIcon';
import ArrowsMoveIcon from '../../icons/ArrowsMoveIcon';
import CrosshairIcon from '../../icons/CrosshairIcon';
import { SPACING_SM } from '../../constants/styleConstants';
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

  const handleIconClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log('icon button clicked', e);
    // setActiveAnnotationId()
  };

  const handleAddToMapClick: MouseEventHandler<HTMLButtonElement> = (_e) => {
    dispatch(actions.setMapClickAction(MAP_CLICK_ACTION_TYPE_ADD_NEW));
  };

  const handleRemoveFromMapClick: MouseEventHandler<HTMLButtonElement> = (
    _e
  ) => {
    if (annotations.activeAnnotationId) {
      dispatch(actions.removeAnnotationMarker(annotations.activeAnnotationId));
    }
  };

  const handleRelocateMarkerClick: MouseEventHandler<HTMLButtonElement> = (
    _e
  ) => {
    dispatch(actions.setMapClickAction(MAP_CLICK_ACTION_TYPE_RELOCATE));
  };

  return (
    <ActionsRow>
      {isMarkerPresentOnMap ? (
        <Button
          title='Remove from map'
          onClick={handleRemoveFromMapClick}
          disabled={areButtonsDisabled}
          variant='danger'
        >
          <DashIcon />
        </Button>
      ) : (
        <Button
          title='Add to map'
          onClick={handleAddToMapClick}
          disabled={areButtonsDisabled}
          variant='success'
        >
          <PlusIcon />
        </Button>
      )}
      <Button
        title='Relocate marker'
        onClick={handleRelocateMarkerClick}
        disabled={areButtonsDisabled}
        variant='warning'
      >
        <ArrowsMoveIcon />
      </Button>
      <Button
        title='Center around marker'
        onClick={handleIconClick}
        disabled={areButtonsDisabled}
        variant='info'
      >
        <CrosshairIcon />
      </Button>
    </ActionsRow>
  );
};

export default AnnotationActions;

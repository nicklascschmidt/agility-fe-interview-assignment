import { useDispatch, useSelector } from 'react-redux';
import FilterIcon from '../../icons/FilterIcon';
import { SPACING_SM } from '../../constants/styleConstants';
import styled from 'styled-components/macro';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RootReducerState } from '../../redux/reducers';
import { Annotation } from '../../types/annotationTypes';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ANNOTATION_OPTIONS } from '../../constants/annotationConstants';
import { actions } from '../../redux/annotations_reducer';
import CheckCircleIcon from '../../icons/CheckCircleIcon';

const DROPDOWN_OPTIONS = [
  {
    id: 'no_angles',
    text: 'No angles',
    testFunction: ({ numOfAngles }: Annotation) => numOfAngles === 0,
    isActive: false,
  },
  {
    id: '3_angles',
    text: '3 angles',
    testFunction: ({ numOfAngles }: Annotation) => numOfAngles === 3,
    isActive: false,
  },
  {
    id: '4_angles',
    text: '4 angles',
    testFunction: ({ numOfAngles }: Annotation) => numOfAngles === 4,
    isActive: false,
  },
  {
    id: '>4_angles',
    text: '>4 angles',
    testFunction: ({ numOfAngles }: Annotation) => numOfAngles > 4,
    isActive: false,
  },
];

const DropdownOptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${SPACING_SM};
`;

type AnnotationFilterButtonProps = {
  setFilteredAnnotations: Dispatch<SetStateAction<Annotation[]>>;
};

const AnnotationFilterButton: FC<AnnotationFilterButtonProps> = ({
  setFilteredAnnotations,
}) => {
  const dispatch = useDispatch();
  const annotations = useSelector(
    (state: RootReducerState) => state.annotations
  );
  const [dropdownOptions, setDropdownOptions] = useState(DROPDOWN_OPTIONS);
  const activeFilterFunctions = useMemo(
    () =>
      dropdownOptions
        .filter(({ isActive }) => isActive)
        .map(({ testFunction }) => testFunction),
    [dropdownOptions]
  );
  const areAnyDropdownOptionsSelected = useMemo(
    () => activeFilterFunctions.length > 0,
    [activeFilterFunctions]
  );

  const handleFilterItemClick = (optionId: string) => {
    const nextDropdownOptions = dropdownOptions.map((annotationOption) =>
      optionId === annotationOption.id
        ? {
            ...annotationOption,
            isActive: !annotationOption.isActive,
          }
        : annotationOption
    );
    setDropdownOptions(nextDropdownOptions);
  };

  // When the filters are updated, update the list of annotations displayed.
  useEffect(() => {
    // If filters are selected, filter the list of annotation options to match
    //  the criteria resulting from the filterFunc.
    // If no filters are selected, show all options.
    let nextAnnotations = ANNOTATION_OPTIONS;
    if (areAnyDropdownOptionsSelected) {
      nextAnnotations = ANNOTATION_OPTIONS.filter((annotationOption) => {
        const isValid = activeFilterFunctions.some((filterFunc) =>
          filterFunc(annotationOption)
        );
        // If there's an active annotation that won't be part of the list of options
        //  (after filtering), then deselect that option.
        if (
          !isValid &&
          annotationOption.id === annotations.activeAnnotationId
        ) {
          dispatch(actions.setActiveAnnotationId(null));
        }
        return isValid;
      });
    }
    setFilteredAnnotations(nextAnnotations);
  }, [
    dispatch,
    dropdownOptions,
    annotations.activeAnnotationId,
    areAnyDropdownOptionsSelected,
    activeFilterFunctions,
    setFilteredAnnotations,
  ]);

  return (
    <DropdownButton
      variant='secondary'
      title={<FilterIcon />}
      autoClose='outside'
      size='sm'
    >
      {DROPDOWN_OPTIONS.map(({ id, text }, idx) => (
        <Dropdown.Item
          key={`Menu-DROPDOWN_OPTIONS-${id}-${idx}`}
          as='button'
          onClick={() => handleFilterItemClick(id)}
        >
          <DropdownOptionRow>
            <div>{text}</div>
            {areAnyDropdownOptionsSelected &&
              dropdownOptions.find((option) => option.id === id)?.isActive && (
                <CheckCircleIcon />
              )}
          </DropdownOptionRow>
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default AnnotationFilterButton;

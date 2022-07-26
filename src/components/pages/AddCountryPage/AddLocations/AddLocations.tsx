import { useAppSelector } from 'hooks/redux/hooks';
import { selectStates } from 'redux/slices';
import { AddLocationsWrapper, AddLocationsContent } from './AddLocations.styled';
import { HeadingsList } from './HeadingsList/HeadingsList';

import { EditStatesList } from './State/EditStatesList/EditStatesList';
import { AddStateForm } from './State/AddStateForm/AddStateForm';

export const AddLocations = () => {
  const states = useAppSelector(selectStates);

  return (
    <AddLocationsWrapper>
      <HeadingsList />

      <AddLocationsContent>
        <EditStatesList editLocationsList={states} />

        <AddStateForm />
      </AddLocationsContent>
    </AddLocationsWrapper>
  );
};

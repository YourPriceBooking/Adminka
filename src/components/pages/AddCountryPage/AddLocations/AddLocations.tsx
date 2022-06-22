import { useAppSelector } from 'hooks/redux/hooks';
import { AddLocationsWrapper, AddLocationsContent } from './AddLocations.styled';
import { HeadingsList } from './HeadingsList/HeadingsList';

import { EditStatesList } from './State/EditStatesList/EditStatesList';
import { AddStateForm } from './State/AddStateForm/AddStateForm';
import { selectStates } from 'redux/slices';

export default function AddLocations() {
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
}

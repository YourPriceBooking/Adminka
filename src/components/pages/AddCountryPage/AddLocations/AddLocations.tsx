import { useAppSelector } from 'hooks/redux/hooks';
import { AddLocationsWrapper, AddLocationsContent } from './AddLocations.styled';
import { HeadingsList } from './HeadingsList/HeadingsList';

import { EditStateList } from './State/EditStateList/EditStateList';
import { AddStateForm } from './State/AddStateForm/AddStateForm';
import { selectStates } from 'redux/slices';

export default function AddLocations() {
  const states = useAppSelector(selectStates);

  return (
    <AddLocationsWrapper>
      <HeadingsList />

      <AddLocationsContent>
        <EditStateList editLocationsList={states} />

        <AddStateForm />
      </AddLocationsContent>
    </AddLocationsWrapper>
  );
}

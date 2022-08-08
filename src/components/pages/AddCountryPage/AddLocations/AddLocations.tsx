import { useVisibleStates } from 'hooks/redux';
import { useGetLanguagesQuery } from 'redux/apis';
import { AddLocationsWrapper, AddLocationsContent } from './AddLocations.styled';
import { HeadingsList } from './HeadingsList/HeadingsList';

import { EditStatesList } from './State/EditStatesList/EditStatesList';
import { AddStateForm } from './State/AddStateForm/AddStateForm';

export const AddLocations = () => {
  // const states = useAppSelector(selectStates);

  const { data: languages } = useGetLanguagesQuery();

  const states = useVisibleStates(languages);

  return (
    <AddLocationsWrapper>
      <HeadingsList />

      <AddLocationsContent>
        {states && <EditStatesList editLocationsList={states} />}

        <AddStateForm />
      </AddLocationsContent>
    </AddLocationsWrapper>
  );
};

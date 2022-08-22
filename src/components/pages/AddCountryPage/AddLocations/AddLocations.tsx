import { AddLocationsWrapper } from './AddLocations.styled';
import { TableHeader } from './TableHeader/TableHeader';
import { States } from './States';
import { StatesList } from './States/StatesList/StatesList';
import { AddStateForm } from './States/AddStateForm';

export const AddLocations = () => (
  <AddLocationsWrapper>
    <TableHeader />

    <States>
      <StatesList />

      <AddStateForm />
    </States>
  </AddLocationsWrapper>
);

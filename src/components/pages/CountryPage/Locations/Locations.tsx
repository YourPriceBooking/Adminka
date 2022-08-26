import { LocationsWrapper } from './Locations.styled';
import { TableHeader } from './TableHeader/TableHeader';
import { States } from './States';
import { StatesList } from './States/StatesList/StatesList';
import { AddStateForm } from './States/AddStateForm';

export const Locations = () => (
  <LocationsWrapper>
    <TableHeader />

    <States>
      <StatesList />

      <AddStateForm />
    </States>
  </LocationsWrapper>
);

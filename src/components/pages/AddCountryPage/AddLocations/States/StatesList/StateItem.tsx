import { Cities } from '../../Cities';
import { EditStateForm } from '../EditStateForm/EditStateForm';

import { LocationsItemStyled } from './StatesList.styled';

type StateItemType = {
  stateId: string;
};

export const StateItem = ({ stateId }: StateItemType) => (
  <LocationsItemStyled>
    <EditStateForm stateId={stateId} />

    <Cities stateId={stateId} />
  </LocationsItemStyled>
);

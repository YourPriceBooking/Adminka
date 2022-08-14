import { Dispatch, SetStateAction, useEffect } from 'react';

import type { State } from 'types/apis';
import { AddCityForm } from '../../City/AddCityForm/AddCityForm';
import { EditCitiesList } from '../../City/EditCitiesList/EditCitiesList';
import { EditStateForm } from '../EditStateForm/EditStateForm';

import { City, EditLocationsItemStyled } from './EditStatesList.styled';

type EditStateItemType = {
  stateItem: State;
  setVisibleStatesCount: Dispatch<SetStateAction<number>>;
};

export const EditStateItem = ({ stateItem, setVisibleStatesCount }: EditStateItemType) => {
  useEffect(() => {
    setVisibleStatesCount(count => count + 1);
    return () => setVisibleStatesCount(count => count - 1);
  }, [setVisibleStatesCount]);

  return (
    <EditLocationsItemStyled className="state">
      <EditStateForm stateItem={stateItem} />

      <City className="city">
        <EditCitiesList cities={stateItem.cities} />
        <AddCityForm stateId={stateItem._id} stateInternational={stateItem.stateInternational} />
      </City>
    </EditLocationsItemStyled>
  );
};

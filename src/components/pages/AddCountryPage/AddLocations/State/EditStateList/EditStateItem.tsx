import { Dispatch, SetStateAction, useEffect } from 'react';
import type { EditState } from 'types/apis';
import { AddCityForm } from '../../City/AddCityForm/AddCityForm';
import { EditCityList } from '../../City/EditCityList/EditCityList';
import { EditStateForm } from '../EditStateForm/EditStateForm';

import { City, EditLocationsItemStyled } from './EditStateList.styled';

type EditStateItemType = EditState & {
  setVisibleStatesCount: Dispatch<SetStateAction<number>>;
};

export const EditStateItem = ({ setVisibleStatesCount, ...stateInfo }: EditStateItemType) => {
  useEffect(() => {
    setVisibleStatesCount(count => count + 1);
    return () => setVisibleStatesCount(count => count - 1);
  }, [setVisibleStatesCount]);

  return (
    <EditLocationsItemStyled className="state">
      <EditStateForm {...stateInfo} />

      <City className="city">
        <EditCityList cities={stateInfo.cities} />
        <AddCityForm stateId={stateInfo._id} />
      </City>
    </EditLocationsItemStyled>
  );
};

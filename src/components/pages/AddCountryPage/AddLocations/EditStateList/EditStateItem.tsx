import { Dispatch, SetStateAction, useEffect } from 'react';
import type { EditState } from 'types/apis';
import { EditStateForm } from '../EditStateForm/EditStateForm';

import { EditLocationsItemStyled } from './EditStateList.styled';

type EditStateItemType = EditState & {
  setVisibleStatesCount: Dispatch<SetStateAction<number>>;
};

export const EditStateItem = ({
  setVisibleStatesCount,

  ...stateInfo
}: EditStateItemType) => {
  useEffect(() => {
    setVisibleStatesCount(count => count + 1);
    return () => setVisibleStatesCount(count => count - 1);
  }, [setVisibleStatesCount]);

  return (
    <EditLocationsItemStyled className="state">
      <EditStateForm {...stateInfo} />

      <div className="city" style={{ display: 'flex', gap: '20px' }}>
        <ul className="EditCityList">
          <li className="EditCityItem">
            <div>
              <form>EditCityForm</form>
            </div>
          </li>

          <li className="EditCityItem">
            <div>
              <form>EditCityForm</form>
            </div>
          </li>
        </ul>

        <form>AddCityForm</form>
      </div>

      <div className="district" style={{ display: 'flex', gap: '20px' }}>
        <ul className="EditDistrictList">
          <li className="EditDistrictItem">
            <form>EditDistrictForm</form>
          </li>
          <li className="EditDistrictItem">
            <form>EditDistrictForm</form>
          </li>
          <li className="EditDistrictItem">
            <form>EditDistrictForm</form>
          </li>
        </ul>

        <form>AddDistrictForm</form>
      </div>
    </EditLocationsItemStyled>
  );
};

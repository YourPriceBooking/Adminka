import type { City } from 'types/apis';
import { AddDistrictForm } from '../../District/AddDistrictForm/AddDistrictForm';
import { EditDistrictsList } from '../../District/EditDistrictsList/EditDistrictsList';
import { EditCityForm } from '../EditCityForm/EditCityForm';
import { District, EditCityItemStyled } from './EditCitiesList.styled';

export const EditCityItem = (city: City) => {
  return (
    <EditCityItemStyled key={city._id}>
      <EditCityForm {...city} />

      <District className="district">
        <EditDistrictsList districts={city.districts} />
        <AddDistrictForm stateId={city.stateId} cityId={city._id} />
      </District>
    </EditCityItemStyled>
  );
};

import type { City } from 'types/apis';
import { AddDistrictForm } from '../../District/AddDistrictForm/AddDistrictForm';
import { EditDistrictsList } from '../../District/EditDistrictsList/EditDistrictsList';
import { EditCityForm } from '../EditCityForm/EditCityForm';
import { District, EditCityItemStyled } from './EditCitiesList.styled';

export type EditCityItemType = {
  city: City;
};

export const EditCityItem = ({ city }: EditCityItemType) => (
  <EditCityItemStyled key={city._id}>
    <EditCityForm city={city} />

    <District className="district">
      <EditDistrictsList districts={city.districts} />
      <AddDistrictForm stateId={city.stateId} cityId={city._id} />
    </District>
  </EditCityItemStyled>
);

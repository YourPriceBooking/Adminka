import type { City } from 'types/apis';
import { EditCityForm } from '../EditCityForm/EditCityForm';
import { EditCityItemStyled } from './EditCityList.styled';

export const EditCityItem = (city: City) => {
  return (
    <EditCityItemStyled key={city._id}>
      <EditCityForm {...city} />

      {/* <District className="district">
        <EditDistrictList>
          {editDistricts.map(district => (
            <EditDistrictItem key={district._id} {...district}>
              <EditDistrictForm cityId={city._id} stateId={city.stateId} {...district} />
            </EditDistrictItem>
          ))}
        </EditDistrictList>

        <form>AddDistrictForm</form>
      </District> */}
    </EditCityItemStyled>
  );
};

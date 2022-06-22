import type { District } from 'types/apis';
import { EditDistrictForm } from '../EditDistrictForm/EditDistrictForm';
import { EditDistrictItemStyled } from './EditDistrictsList.styled';

export const EditDistrictItem = (district: District) => {
  return (
    <EditDistrictItemStyled key={district._id}>
      <EditDistrictForm {...district} />
    </EditDistrictItemStyled>
  );
};

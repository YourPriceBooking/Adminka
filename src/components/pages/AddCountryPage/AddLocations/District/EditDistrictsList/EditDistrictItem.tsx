import type { District } from 'types/apis';
import { EditDistrictForm } from '../EditDistrictForm/EditDistrictForm';
import { EditDistrictItemStyled } from './EditDistrictsList.styled';

export type EditDistrictItemType = {
  district: District;
};

export const EditDistrictItem = ({ district }: EditDistrictItemType) => (
  <EditDistrictItemStyled key={district._id}>
    <EditDistrictForm district={district} />
  </EditDistrictItemStyled>
);

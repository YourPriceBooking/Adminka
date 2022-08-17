import { EditDistrictForm } from '../EditDistrictForm/EditDistrictForm';
import { DistrictItemStyled } from './DistrictsList.styled';

export type DistrictItemProps = {
  districtId: string;
};

export const DistrictItem = ({ districtId }: DistrictItemProps) => (
  <DistrictItemStyled>
    <EditDistrictForm districtId={districtId} />
  </DistrictItemStyled>
);

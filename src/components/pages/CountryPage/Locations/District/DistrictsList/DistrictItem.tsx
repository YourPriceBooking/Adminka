import type { EntityId } from '@reduxjs/toolkit';
import { EditDistrictForm } from '../EditDistrictForm/EditDistrictForm';
import { DistrictItemStyled } from './DistrictsList.styled';

export type DistrictItemProps = {
  districtId: EntityId;
};

export const DistrictItem = ({ districtId }: DistrictItemProps) => (
  <DistrictItemStyled>
    <EditDistrictForm districtId={districtId} />
  </DistrictItemStyled>
);

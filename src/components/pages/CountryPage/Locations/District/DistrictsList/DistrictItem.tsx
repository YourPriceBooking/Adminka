import type { EntityId } from '@reduxjs/toolkit';
import { EditDistrictForm } from '../EditDistrictForm/EditDistrictForm';
import { DistrictItemStyled } from './DistrictsList.styled';

export type DistrictItemProps = {
  districtId: EntityId;
  cityId: EntityId;
  stateId: EntityId;
};

export const DistrictItem = ({ districtId, cityId, stateId }: DistrictItemProps) => (
  <DistrictItemStyled>
    <EditDistrictForm districtId={districtId} cityId={cityId} stateId={stateId} />
  </DistrictItemStyled>
);

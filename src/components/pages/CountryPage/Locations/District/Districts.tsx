import type { EntityId } from '@reduxjs/toolkit';
import { AddDistrictForm } from './AddDistrictForm';
import { DistrictsStyled } from './Districts.styled';
import { DistrictsList } from './DistrictsList';

type DistrictsProps = {
  cityId: EntityId;
  stateId: EntityId;
};

export const Districts = ({ cityId, stateId }: DistrictsProps) => (
  <DistrictsStyled>
    <DistrictsList cityId={cityId} stateId={stateId} />

    <AddDistrictForm cityId={cityId} stateId={stateId} />
  </DistrictsStyled>
);

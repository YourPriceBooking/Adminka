import type { EntityId } from '@reduxjs/toolkit';
import { AddDistrictForm } from './AddDistrictForm';
import { DistrictsStyled } from './Districts.styled';
import { DistrictsList } from './DistrictsList';

type DistrictsProps = {
  cityId: EntityId;
};

export const Districts = ({ cityId }: DistrictsProps) => (
  <DistrictsStyled>
    <DistrictsList cityId={cityId} />

    <AddDistrictForm cityId={cityId} />
  </DistrictsStyled>
);

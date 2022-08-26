import type { EntityId } from '@reduxjs/toolkit';
import { AddDistrictForm } from '../../District/AddDistrictForm/AddDistrictForm';
import { DistrictsList } from '../../District/DistrictsList/DistrictsList';

import { EditCityForm } from '../EditCityForm/EditCityForm';
import { DistrictsStyled, CityItemStyled } from './CitiesList.styled';

export type CityItemProps = {
  cityId: EntityId;
};

type DistrictsProps = CityItemProps;

export const Districts = ({ cityId }: DistrictsProps) => (
  <DistrictsStyled>
    <DistrictsList cityId={cityId} />

    <AddDistrictForm cityId={cityId} />
  </DistrictsStyled>
);

export const CityItem = ({ cityId }: CityItemProps) => (
  <CityItemStyled>
    <EditCityForm cityId={cityId} />

    {/* <Districts cityId={cityId} /> */}
  </CityItemStyled>
);

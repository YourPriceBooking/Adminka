import type { EntityId } from '@reduxjs/toolkit';
import { Districts } from '../../District';
import { EditCityForm } from '../EditCityForm/EditCityForm';
import { CityItemStyled } from './CitiesList.styled';

export type CityItemProps = {
  cityId: EntityId;
};

export const CityItem = ({ cityId }: CityItemProps) => (
  <CityItemStyled>
    <EditCityForm cityId={cityId} />

    <Districts cityId={cityId} />
  </CityItemStyled>
);

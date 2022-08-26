import type { EntityId } from '@reduxjs/toolkit';
import { logRender } from 'common/utils';
import { CitiesListStyled } from './CitiesList.styled';
import { CityItem } from './CityItem';

type CitiesListProps = {
  stateId: EntityId;
};

const arr: never[] = [];

export const CitiesList = ({ stateId }: CitiesListProps) => {
  const citiesIds = arr;
  logRender('CitiesList', stateId);

  return (
    <CitiesListStyled>
      {citiesIds.map(cityId => (
        <CityItem key={cityId} cityId={cityId} />
      ))}
    </CitiesListStyled>
  );
};

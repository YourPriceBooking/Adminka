import { logRender } from 'common/utils';
import { CitiesListStyled } from './CitiesList.styled';
import { CityItem } from './CityItem';

type CitiesListProps = {
  stateId: string;
};

const arr = ['1', '2'];

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

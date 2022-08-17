import { logRender } from 'common/utils';
import { CitiesListStyled } from './CitiesList.styled';
import { CityItem } from './CityItem';

const useSelectCitiesIds = (stateId: string) => {
  logRender('useSelectCitiesIds ~ stateId', stateId);
  return ['cityId1', 'cityId2'];
};

type CitiesListProps = {
  stateId: string;
};

export const CitiesList = ({ stateId }: CitiesListProps) => {
  const citiesIds = useSelectCitiesIds(stateId);

  return (
    <CitiesListStyled>
      {citiesIds.map(cityId => (
        <CityItem key={cityId} cityId={cityId} />
      ))}
    </CitiesListStyled>
  );
};

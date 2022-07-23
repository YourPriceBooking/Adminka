import type { City } from 'types/apis';
import { EditCitiesListStyled } from './EditCitiesList.styled';
import { EditCityItem } from './EditCityItem';

type EditCitiesListProps = {
  cities: City[];
};

export const EditCitiesList = ({ cities }: EditCitiesListProps) => (
  <EditCitiesListStyled>
    {cities.map(city => (
      <EditCityItem key={city._id} {...city} />
    ))}
  </EditCitiesListStyled>
);

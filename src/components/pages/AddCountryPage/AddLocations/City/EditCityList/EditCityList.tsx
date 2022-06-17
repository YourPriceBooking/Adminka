import type { City } from 'types/apis';
import { EditCityListStyled } from './EditCityList.styled';
import { EditCityItem } from './EditCityItem';

type EditCityListProps = {
  cities: City[];
};

export const EditCityList = ({ cities }: EditCityListProps) => {
  return (
    <EditCityListStyled>
      {cities.map(city => (
        <EditCityItem key={city._id} {...city} />
      ))}
    </EditCityListStyled>
  );
};

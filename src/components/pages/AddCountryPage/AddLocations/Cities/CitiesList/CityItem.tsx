import { AddDistrictForm } from '../../District/AddDistrictForm/AddDistrictForm';
import { DistrictsList } from '../../District/DistrictsList/DistrictsList';

import { EditCityForm } from '../EditCityForm/EditCityForm';
import { DistrictsStyled, CityItemStyled } from './CitiesList.styled';

export type CityItemProps = {
  cityId: string;
};

type DistrictsProps = CityItemProps;

const Districts = ({ cityId }: DistrictsProps) => (
  <DistrictsStyled>
    <DistrictsList cityId={cityId} />

    <AddDistrictForm cityId={cityId} />
  </DistrictsStyled>
);

export const CityItem = ({ cityId }: CityItemProps) => (
  <CityItemStyled>
    <EditCityForm cityId={cityId} />

    <Districts cityId={cityId} />
  </CityItemStyled>
);

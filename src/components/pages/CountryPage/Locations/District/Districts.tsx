import type { CityItemProps } from '../Cities/CitiesList/CityItem';
import { AddDistrictForm } from './AddDistrictForm';
import { DistrictsStyled } from './Districts.styled';
import { DistrictsList } from './DistrictsList';

type DistrictsProps = CityItemProps;

export const Districts = ({ cityId }: DistrictsProps) => (
  <DistrictsStyled>
    <DistrictsList cityId={cityId} />

    <AddDistrictForm cityId={cityId} />
  </DistrictsStyled>
);

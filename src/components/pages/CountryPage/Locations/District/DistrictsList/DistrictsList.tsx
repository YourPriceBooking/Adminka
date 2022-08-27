import type { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'App';
import { selectCityById } from 'features/cities';
import { DistrictItem } from './DistrictItem';
import { DistrictsListStyled } from './DistrictsList.styled';

type DistrictsListProps = {
  cityId: EntityId;
};

export const DistrictsList = ({ cityId }: DistrictsListProps) => {
  const districtsIds = useAppSelector(state => selectCityById(state, cityId))?.districts;
  console.log({ districtsIds });

  return (
    <DistrictsListStyled>
      {districtsIds?.map(districtId => (
        <DistrictItem key={districtId} districtId={districtId} />
      ))}
    </DistrictsListStyled>
  );
};

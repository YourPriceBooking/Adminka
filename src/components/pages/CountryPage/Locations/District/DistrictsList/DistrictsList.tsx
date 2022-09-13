import type { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'App';
import { selectCityById } from 'features/cities';
import { DistrictItem } from './DistrictItem';
import { DistrictsListStyled } from './DistrictsList.styled';

type DistrictsListProps = {
  cityId: EntityId;
  stateId: EntityId;
};

export const DistrictsList = ({ cityId, stateId }: DistrictsListProps) => {
  const districtsIds = useAppSelector(state => selectCityById(state, cityId))?.districts;

  return (
    <DistrictsListStyled>
      {districtsIds?.map(districtId => (
        <DistrictItem key={districtId} districtId={districtId} cityId={cityId} stateId={stateId} />
      ))}
    </DistrictsListStyled>
  );
};

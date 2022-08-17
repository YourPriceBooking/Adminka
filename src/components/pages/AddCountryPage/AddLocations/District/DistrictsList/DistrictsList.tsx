import { DistrictItem } from './DistrictItem';
import { DistrictsListStyled } from './DistrictsList.styled';

type DistrictsListProps = {
  cityId: string;
};

const districtIds = ['1', '2'];

const useSelectDistrictsIds = (cityId: string) => {
  console.log('useSelectDistrictsIds ~ cityId', cityId);

  return districtIds;
};

export const DistrictsList = ({ cityId }: DistrictsListProps) => {
  const districtsIds = useSelectDistrictsIds(cityId);

  return (
    <DistrictsListStyled>
      {districtsIds.map(districtId => (
        <DistrictItem key={districtId} districtId={districtId} />
      ))}
    </DistrictsListStyled>
  );
};

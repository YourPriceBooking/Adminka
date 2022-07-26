import type { District } from 'types/apis';
import { EditDistrictsListStyled } from './EditDistrictsList.styled';
import { EditDistrictItem } from './EditDistrictItem';

type EditDistrictsListProps = {
  districts: District[];
};

export const EditDistrictsList = ({ districts }: EditDistrictsListProps) => (
  <EditDistrictsListStyled>
    {districts.map(district => (
      <EditDistrictItem key={district._id} district={district} />
    ))}
  </EditDistrictsListStyled>
);

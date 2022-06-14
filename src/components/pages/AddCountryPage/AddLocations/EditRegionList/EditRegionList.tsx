import { EditRegionListStyled } from './EditRegionList.styled';
import type { Region } from 'types/apis';
import { EditRegionItem } from './EditRegionItem';

type EditRegionListType = {
  editLocationsList: Region[];
};

export const EditRegionList = ({ editLocationsList }: EditRegionListType) => {
  return (
    <EditRegionListStyled>
      {editLocationsList?.map((location: Region) => (
        <EditRegionItem key={location._id} {...location} />
      ))}
    </EditRegionListStyled>
  );
};

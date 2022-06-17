import { EditStateListStyled } from './EditStateList.styled';
import type { State } from 'types/apis';
import { EditStateItem } from './EditStateItem';
import { useState } from 'react';

type EditStateListType = {
  editLocationsList: State[];
};

export const EditStateList = ({ editLocationsList }: EditStateListType) => {
  const [visibleStatesCount, setVisibleStatesCount] = useState(0);
  console.log({ visibleStatesCount });

  return (
    <EditStateListStyled>
      {editLocationsList?.map((location: State) => (
        <EditStateItem
          key={location._id}
          setVisibleStatesCount={setVisibleStatesCount}
          {...location}
        />
      ))}
    </EditStateListStyled>
  );
};

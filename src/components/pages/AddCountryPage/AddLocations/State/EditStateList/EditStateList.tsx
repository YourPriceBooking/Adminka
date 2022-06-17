import { EditStateListStyled, TotalStatesIndicator } from './EditStateList.styled';
import type { State } from 'types/apis';
import { EditStateItem } from './EditStateItem';
import { useState } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectDev } from 'redux/slices';

type EditStateListType = {
  editLocationsList: State[];
};

export const EditStateList = ({ editLocationsList }: EditStateListType) => {
  const [visibleStatesCount, setVisibleStatesCount] = useState(0);

  const dev = useAppSelector(selectDev);

  return (
    <>
      {dev && <TotalStatesIndicator>Total states: {visibleStatesCount}</TotalStatesIndicator>}

      <EditStateListStyled>
        {editLocationsList?.map((location: State) => (
          <EditStateItem
            key={location._id}
            setVisibleStatesCount={setVisibleStatesCount}
            {...location}
          />
        ))}
      </EditStateListStyled>
    </>
  );
};

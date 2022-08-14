import type { State } from 'types/apis';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { incrementCounter, selectCounterValue, selectDev } from 'features/slices';
import { logRender } from 'common/utils';
import { EditStateItem } from './EditStateItem';
import { EditStatesListStyled, TotalStatesIndicator } from './EditStatesList.styled';

type EditStatesListType = {
  editLocationsList: State[];
};

export const EditStatesList = ({ editLocationsList }: EditStatesListType) => {
  const [visibleStatesCount, setVisibleStatesCount] = useState(0);
  const counter = useAppSelector(selectCounterValue);

  const appDispatch = useAppDispatch();
  const addOne = useCallback(() => appDispatch(incrementCounter(1)), [appDispatch]);

  const dev = useAppSelector(selectDev);

  logRender('EditStatesList');

  return (
    <>
      {dev && (
        <>
          <TotalStatesIndicator>Total states: {visibleStatesCount}</TotalStatesIndicator>

          <p>{counter}</p>

          <button type="button" onClick={addOne}>
            Counter +1
          </button>
        </>
      )}

      <EditStatesListStyled>
        {editLocationsList?.map((location: State) => (
          <EditStateItem
            key={location._id}
            setVisibleStatesCount={setVisibleStatesCount}
            stateItem={location}
          />
        ))}
      </EditStatesListStyled>
    </>
  );
};

import { EditStatesListStyled, TotalStatesIndicator } from './EditStatesList.styled';
import type { State } from 'types/apis';
import { EditStateItem } from './EditStateItem';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { incrementCounter, selectDev } from 'redux/slices';

type EditStatesListType = {
  editLocationsList: State[];
};

let EditStatesListRender = 0;

export const EditStatesList = ({ editLocationsList }: EditStatesListType) => {
  const [visibleStatesCount, setVisibleStatesCount] = useState(0);
  // const counter = useAppSelector(selectCounterValue);

  const appDispatch = useAppDispatch();
  const addOne = useCallback(() => appDispatch(incrementCounter(1)), [appDispatch]);

  const dev = useAppSelector(selectDev);

  return (
    <>
      {dev && (
        <>
          <TotalStatesIndicator>Total states: {visibleStatesCount}</TotalStatesIndicator>

          {/* <p>{counter}</p> */}

          <button type="button" onClick={addOne}>
            Counter +1
          </button>
        </>
      )}

      {console.log({ EditStatesListRender: (EditStatesListRender += 1) })}

      <EditStatesListStyled>
        {editLocationsList?.map((location: State) => (
          <EditStateItem
            key={location._id}
            setVisibleStatesCount={setVisibleStatesCount}
            {...location}
          />
        ))}
      </EditStatesListStyled>
    </>
  );
};

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { incrementCounter, selectCounterValue, selectActiveLangId } from 'features/common';
import { logRender } from 'common/utils';
import { selectDev } from 'features/countries';
import type { RootState } from 'App/store';
import type { EntityId } from '@reduxjs/toolkit';
import { StateItem } from './StateItem';
import { StatesListStyled } from './StatesList.styled';

const DevModeStats = () => {
  const counter = useAppSelector(selectCounterValue);
  const appDispatch = useAppDispatch();
  const addOne = useCallback(() => appDispatch(incrementCounter(1)), [appDispatch]);
  const dev = useAppSelector(selectDev);

  return (
    <div>
      {dev && (
        <>
          <p>{counter}</p>

          <button type="button" onClick={addOne}>
            Counter +1
          </button>
        </>
      )}
    </div>
  );
};

const arr = ['1', '2'];
const defaultArr = ['3', '4'];
const selectStatesIds = (state: RootState, activeLangId: EntityId) => {
  logRender('selectStatesIds', activeLangId);
  return arr;
};

const useSelectStatesIds = () => {
  const activeLangId = useAppSelector(selectActiveLangId);
  const statesIds = useAppSelector(state => {
    if (activeLangId) {
      return selectStatesIds(state, activeLangId);
    }

    return defaultArr;
  });

  return statesIds;
};

export const StatesList = () => {
  const statesIds = useSelectStatesIds();

  logRender('StatesList', statesIds);
  return (
    <>
      <DevModeStats />

      <StatesListStyled>
        {statesIds.map((stateId: string) => {
          logRender(' StateItem', stateId);

          return <StateItem key={stateId} stateId={stateId} />;
        })}
      </StatesListStyled>
    </>
  );
};

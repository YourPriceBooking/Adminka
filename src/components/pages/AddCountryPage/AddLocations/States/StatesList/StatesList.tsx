import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { incrementCounter, selectCounterValue } from 'features/common';
import { logRender } from 'common/utils';
import { selectActiveCountryId, selectCountryById, selectDev } from 'features/countries';
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

export const StatesList = () => {
  console.log('StatesList');

  // active country -> array of ids
  const countryId = useAppSelector(selectActiveCountryId);
  const statesIds = useAppSelector(state => {
    if (!countryId) return undefined;
    return selectCountryById(state, countryId)?.states;
  });

  return (
    <>
      <DevModeStats />

      <StatesListStyled>
        {statesIds?.map(stateId => {
          logRender(' StateItem', stateId);

          return <StateItem key={stateId} stateId={stateId} />;
        })}
      </StatesListStyled>
    </>
  );
};

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { incrementCounter, selectCounterValue } from 'features/common';
import { selectActiveCountryId, selectCountryById, selectDev } from 'features/countries';
import { StateItem } from './StateItem';
import { StatesListStyled } from './StatesList.styled';
// import { Grid } from '../virtualList';

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
  // active country -> array of ids
  const countryId = useAppSelector(selectActiveCountryId);
  const statesIds = useAppSelector(state =>
    countryId ? selectCountryById(state, countryId)?.states : undefined
  );

  return (
    <>
      <DevModeStats />

      <StatesListStyled>
        {statesIds?.map(stateId => (
          <StateItem key={stateId} stateId={stateId} />
        ))}
      </StatesListStyled>
    </>
  );
};

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { incrementCounter, selectCounterValue } from 'features/common';
import { logRender } from 'common/utils';
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
  const statesIds = useAppSelector(state => {
    if (!countryId) return undefined;
    const country = selectCountryById(state, countryId);
    return country?.states;
  });

  logRender('StatesList', { countryId, statesIds }, true);

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

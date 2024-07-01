import { useAppSelector } from 'App';
import { selectStatesFromActiveCountry } from 'features/states';
import { StateItem } from './StateItem';
import { StatesListStyled } from './StatesList.styled';
import { LocationNavigationList } from './LocationNavigationList';

export const StatesList = () => {
  const statesIds = useAppSelector(selectStatesFromActiveCountry);

  return (
    <>
      <StatesListStyled>
        {statesIds?.map(stateId => (
          <StateItem key={stateId} stateId={stateId} />
        ))}
      </StatesListStyled>
      {statesIds && <LocationNavigationList ids={statesIds as string[]} />}
    </>
  );
};

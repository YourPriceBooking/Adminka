import { useAppSelector } from 'App';
import { selectStateById } from 'features/states';
import { NavigationListStyled } from './LocationNavigationList.styled';

export const LocationNavigationItem = ({ id }: { id: string }) => {
  const stateObj = useAppSelector(state => selectStateById(state, id));
  return (
    <li key={id}>
      {' '}
      <a href={`#${id}`}>{stateObj?.stateName}</a>
    </li>
  );
};

export const LocationNavigationList = ({ ids }: { ids: string[] | null }) => (
  <NavigationListStyled>
    {ids?.map(id => (
      <LocationNavigationItem key={id} id={id} />
    ))}
  </NavigationListStyled>
);

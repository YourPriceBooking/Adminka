import { useAppSelector } from 'App';
import { selectStateById } from 'features/states';
import React from 'react';
import { useDragger } from 'common/hooks';
import { NavigationListStyled } from './LocationNavigationList.styled';

export const LocationNavigationItem = ({ id }: { id: string }) => {
  const stateObj = useAppSelector(state => selectStateById(state, id));
  return (
    <li key={id}>
      <a href={`#${id}`}>{stateObj?.stateName}</a>
    </li>
  );
};

export const LocationNavigationList = ({ ids }: { ids: string[] | null }) => {
  useDragger('navlist', true);
  return (
    <NavigationListStyled id="navlist">
      {ids?.map(id => (
        <LocationNavigationItem key={id} id={id} />
      ))}
    </NavigationListStyled>
  );
};

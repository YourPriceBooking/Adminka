import { type ReactNode } from 'react';
import { useGetCitiesQuery } from 'features/cities';
import { useGetDistrictsQuery } from 'features/districts';
import { useGetStatesQuery } from 'features/states';
import { StatesStyled } from './States.styled';

export const getStates = () => {
  useGetStatesQuery();
  useGetCitiesQuery();
  useGetDistrictsQuery();
};

export const States = ({ children }: { children?: ReactNode }) => {
  getStates();

  return <StatesStyled>{children}</StatesStyled>;
};

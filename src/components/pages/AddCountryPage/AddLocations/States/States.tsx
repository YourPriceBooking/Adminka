import { useGetStatesQuery } from 'features/states';
import type { ReactNode } from 'react';
import { StatesStyled } from './States.styled';

export const States = ({ children }: { children?: ReactNode }) => {
  useGetStatesQuery();

  return <StatesStyled>{children}</StatesStyled>;
};

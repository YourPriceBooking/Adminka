import { type ReactNode } from 'react';
import { useGetCitiesQuery } from 'features/cities';
import { useGetDistrictsQuery } from 'features/districts';
import { useGetStatesQuery } from 'features/states';
import { useAppSelector } from 'App';
import {
  selectActiveCountryInternational,
  selectActiveCountryDbLangCode,
} from 'features/countries';
import { skipToken } from '@reduxjs/toolkit/query';
import { StatesStyled } from './States.styled';

export const getStates = () => {
  const international = useAppSelector(selectActiveCountryInternational);
  const dbLangCodeRaw = useAppSelector(selectActiveCountryDbLangCode);
  const dbLangCode = dbLangCodeRaw?.toLowerCase();

  const args = international && dbLangCode ? { international, dbLangCode } : undefined;

  useGetStatesQuery(args ?? skipToken);
  useGetCitiesQuery(args ?? skipToken);
  useGetDistrictsQuery(args ?? skipToken);
};

export const States = ({ children }: { children?: ReactNode }) => {
  getStates();

  return <StatesStyled>{children}</StatesStyled>;
};

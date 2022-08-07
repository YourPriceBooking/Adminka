// import { createSelector } from '@reduxjs/toolkit';
// import { useMemo } from 'react';
import { useGetLanguagesQuery } from 'redux/apis';
import { selectActiveCountryId } from 'redux/slices';
// import type { LanguagesResponse } from 'types/apis';
import { useAppSelector } from '../hooks';

export const useSelectStates = () => {
  // const activeLangId = useAppSelector(selectActiveLangId);
  const activeCountryId = useAppSelector(selectActiveCountryId);

  // const selectStatesForCountry = useMemo(
  //   () =>
  //     createSelector(
  //       (res: { data: LanguagesResponse }) => res.data,
  //       (res: LanguagesResponse, langId: string) => langId,
  //       (res: LanguagesResponse, langId: string, countryId: string) => countryId,
  //       (languages, langId, countryId) =>
  //         languages
  //           ?.find(language => language._id === langId)
  //           ?.countries?.find(country => country._id === countryId)?.states
  //     ),
  //   []
  // );

  const { states } = useGetLanguagesQuery(undefined, {
    skip: !activeCountryId,
    selectFromResult: response => ({
      states: response.data,
    }),
  });

  return states;
};

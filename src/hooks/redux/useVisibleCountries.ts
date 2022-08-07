// import { useMemo } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectActiveCountryId, selectActiveLangId } from 'redux/slices';
import type { LanguagesResponse } from 'types/apis';

export const useVisibleCountries = (languages: LanguagesResponse | undefined) => {
  const activeLangId = useAppSelector(selectActiveLangId);

  // return useMemo(
  //   () => ,
  //   [activeLangId, languages]
  // );

  return languages?.find(language => language._id === activeLangId)?.countries;
};

export const useVisibleStates = (languages: LanguagesResponse | undefined) => {
  const countries = useVisibleCountries(languages);
  const activeCountryId = useAppSelector(selectActiveCountryId);

  // return useMemo(
  //   () => ,
  //   [activeCountryId, countries]
  // );

  return countries?.find(country => country._id === activeCountryId)?.states;
};

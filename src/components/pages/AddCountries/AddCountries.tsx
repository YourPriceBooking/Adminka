import { AddCountriesStyled, CountryEditorWrapper, ShowEditorButton } from './AddCountries.styled';

import { FormEvent, useCallback, useMemo, useState } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import {
  selectActiveCountryName,
  selectActiveLang,
  // selectCountriesForActiveLanguage,
  selectIsEnglishActiveLang,
} from 'redux/slices';

import { languagesApi, useAddCountryEngMutation, useGetLanguagesQuery } from 'redux/apis';
import { Dropdown } from './Drowdown/Drowdown';

export default function AddCountries() {
  const { isLoading: isLoadingLanguagesFirstTime, isFetching } = useGetLanguagesQuery();
  const [addCountryEng, { isLoading: isAddingCountry }] = useAddCountryEngMutation();

  const selectCountries = useMemo(() => languagesApi.endpoints.getLanguages.select(), []);
  const { data } = useAppSelector(selectCountries);

  const isLoading = isLoadingLanguagesFirstTime || isFetching || isAddingCountry;

  const activeCountryName = useAppSelector(selectActiveCountryName);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const activeLang = useAppSelector(selectActiveLang);
  const visibleCountries = data?.find(e => e.code === activeLang.code)?.countries;

  const [showCountries, setShowCountries] = useState(false);

  const onSubmitAddCountry = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const country = formData.get('newCountryName')?.toString().trim();
      if (!country) return;

      try {
        await addCountryEng({ country });
      } catch (error) {
        console.log(error);
      }

      form.reset();
    },
    [addCountryEng]
  );

  const toggleCountiesList = useCallback(() => setShowCountries(!showCountries), [showCountries]);

  return (
    <AddCountriesStyled>
      <CountryEditorWrapper>
        <ShowEditorButton type="button" onClick={toggleCountiesList}>
          {activeCountryName}
        </ShowEditorButton>

        {showCountries && (
          <Dropdown
            toggleCountiesList={toggleCountiesList}
            countries={visibleCountries}
            isEng={isEng}
            onSubmitAddCountry={onSubmitAddCountry}
            isLoading={isLoading}
          />
        )}
      </CountryEditorWrapper>
    </AddCountriesStyled>
  );
}

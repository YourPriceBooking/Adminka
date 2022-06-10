import { AddCountriesStyled, CountryEditorWrapper, ShowEditorButton } from './AddCountries.styled';

import { FormEvent, useCallback, useState } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectActiveCountryName, selectIsEnglishActiveLang } from 'redux/slices';

import { useAddCountryMutation, useGetCountriesQuery } from 'redux/apis';
import { Dropdown } from './Drowdown/Drowdown';

export default function AddCountries() {
  const { data: countries } = useGetCountriesQuery();
  const [addCountry] = useAddCountryMutation();
  // const { data: languages } = useGetLanguagesQuery();
  // console.log("AddCountries ~ languages", languages)
  const activeCountryName = useAppSelector(selectActiveCountryName);
  const isEng = useAppSelector(selectIsEnglishActiveLang);

  const [showCountries, setShowCountries] = useState(false);

  const add = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const country = formData.get('newCountryName')?.toString().trim();
      if (!country) return;

      try {
        await addCountry({ country });
      } catch (error) {
        console.log(error);
      }

      form.reset();
    },
    [addCountry]
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
            countries={countries}
            isEng={isEng}
            add={add}
          />
        )}
      </CountryEditorWrapper>
    </AddCountriesStyled>
  );
}

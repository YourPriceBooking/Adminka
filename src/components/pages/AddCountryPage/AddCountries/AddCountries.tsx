import { useGetLanguagesQuery } from 'redux/apis';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import {
  selectActiveCountryName,
  selectActiveLangId,
  selectIsEnglishActiveLang,
} from 'redux/slices';
import { AddCountriesStyled, CountryEditorWrapper, ShowEditorButton } from './AddCountries.styled';
import { Dropdown } from './Drowdown/Drowdown';
import type { Language } from 'types/apis';

export default function AddCountries() {
  const {
    data: languages,
    isLoading: isLoadingLanguagesFirstTime,
    isFetching,
  } = useGetLanguagesQuery();

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const [showCountries, setShowCountries] = useState(false);
  const closeCountiesList = useCallback(() => setShowCountries(false), []);
  const toggleCountiesList = useCallback(() => setShowCountries(show => !show), []);

  const isLoading = isLoadingLanguagesFirstTime || isFetching;
  const activeLangId = useAppSelector(selectActiveLangId);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const activeCountryName = useAppSelector(selectActiveCountryName) ?? 'Select country';

  const derivedVisibleCountries = useMemo(
    () => languages?.find((language: Language) => language._id === activeLangId)?.countries,
    [activeLangId, languages]
  );

  // const { data: visibleCountries } = useGetCountriesQuery();

  return (
    <AddCountriesStyled>
      <CountryEditorWrapper>
        <ShowEditorButton type="button" ref={toggleButtonRef} onClick={toggleCountiesList}>
          {activeCountryName}
        </ShowEditorButton>

        {showCountries && (
          <Dropdown
            closeCountiesList={closeCountiesList}
            countries={derivedVisibleCountries}
            isEng={isEng}
            isLoading={isLoading}
            toggleButtonRef={toggleButtonRef}
          />
        )}
      </CountryEditorWrapper>
    </AddCountriesStyled>
  );
}
